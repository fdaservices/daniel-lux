import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sender address. Uses `wedo.lu` (verified in Resend) by default; override via
 * `CONTACT_FROM` once `daniel-lux.lu` is itself verified in Resend, e.g.
 * `CONTACT_FROM="Daniel-Lux <site@daniel-lux.lu>"`.
 */
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Daniel-Lux <daniel-lux@wedo.lu>";

/** Destination for new contact submissions. Defaults to the company inbox. */
const CONTACT_TO = process.env.CONTACT_TO ?? siteConfig.email;

/**
 * Contact form endpoint.
 * Validates the submission server-side, then forwards it by e-mail via Resend.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields — accept silently so they don't retry.
  if (typeof data.entreprise === "string" && data.entreprise.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const nom = String(data.nom ?? "").trim();
  const prenom = String(data.prenom ?? "").trim();
  const telephone = String(data.telephone ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const consent = data.consent === "on" || data.consent === true;
  const servicesRaw = data.services;
  const servicesList = Array.isArray(servicesRaw)
    ? servicesRaw.map((s) => String(s).trim()).filter(Boolean).join(", ")
    : String(servicesRaw ?? "").trim();

  const invalid: string[] = [];
  if (nom.length < 2) invalid.push("nom");
  if (!EMAIL_RE.test(email)) invalid.push("email");
  if (message.length < 10) invalid.push("message");
  if (!consent) invalid.push("consent");

  if (invalid.length > 0) {
    return NextResponse.json(
      { error: "Merci de vérifier les champs obligatoires du formulaire." },
      { status: 422 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Le service d'envoi est temporairement indisponible." },
      { status: 503 },
    );
  }

  // Instantiated lazily (not at module load) so the production build never fails
  // when RESEND_API_KEY is absent at build time — only this request path needs it.
  const resend = new Resend(process.env.RESEND_API_KEY);

  const fullName = prenom ? `${prenom} ${nom}` : nom;
  const subject = `Nouvelle demande de devis — ${fullName}`;
  const submittedAt = new Date().toLocaleString("fr-LU", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Luxembourg",
  });
  const consentText =
    "J'accepte que les informations transmises via ce formulaire soient utilisées et conservées pour le traitement de ma demande.";

  const text = [
    `Nouvelle demande de devis — ${siteConfig.name}`,
    `Reçue le ${submittedAt}`,
    "",
    "─────────────────────────────────────",
    "COORDONNÉES",
    "─────────────────────────────────────",
    `Nom complet : ${fullName}`,
    `E-mail      : ${email}`,
    telephone ? `Téléphone   : ${telephone}` : null,
    servicesList ? "" : null,
    servicesList ? "─────────────────────────────────────" : null,
    servicesList ? "SERVICES CONCERNÉS" : null,
    servicesList ? "─────────────────────────────────────" : null,
    servicesList || null,
    "",
    "─────────────────────────────────────",
    "PROJET",
    "─────────────────────────────────────",
    message,
    "",
    "─────────────────────────────────────",
    "CONSENTEMENT RGPD",
    "─────────────────────────────────────",
    `[✓] ${consentText}`,
    "",
    "─────────────────────────────────────",
    `Envoyé depuis le formulaire de contact de ${siteConfig.url}`,
    `Répondez directement à ce message pour contacter ${fullName} (${email}).`,
  ]
    .filter(Boolean)
    .join("\n");

  // HTML-escape user-supplied content to prevent injection.
  const esc = (s: string) =>
    s.replace(
      /[<>&"']/g,
      (c) =>
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          '"': "&quot;",
          "'": "&#39;",
        })[c]!,
    );

  const servicesHtml = servicesList
    ? `<tr>
              <td style="padding:24px 32px 8px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1786c2;margin-bottom:12px;">Services concernés</div>
                <div style="font-size:14px;line-height:1.5;color:#0d1825;">${esc(servicesList)}</div>
              </td>
            </tr>`
    : "";

  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="color-scheme" content="light only">
    <title>${esc(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef2f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0d1825;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(10,22,38,0.10);">
            <!-- Header -->
            <tr>
              <td style="background:#0a1626;padding:30px 32px;">
                <div style="font-size:22px;font-weight:900;letter-spacing:-0.5px;color:#ffffff;">DANIEL<span style="color:#1fa2e6;">-LUX</span></div>
                <div style="margin-top:14px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1fa2e6;">Nouvelle demande</div>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:800;line-height:1.3;">Demande de devis reçue</h1>
                <p style="margin:8px 0 0;color:#8896a8;font-size:13px;">${esc(submittedAt)}</p>
              </td>
            </tr>
            <!-- Accent stripe -->
            <tr><td style="height:4px;background:#1fa2e6;line-height:4px;font-size:0;">&nbsp;</td></tr>

            <!-- Coordonnées -->
            <tr>
              <td style="padding:28px 32px 8px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1786c2;margin-bottom:12px;">Coordonnées</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#0d1825;">
                  <tr>
                    <td style="padding:6px 0;width:120px;color:#6b7280;font-size:13px;">Nom complet</td>
                    <td style="padding:6px 0;font-weight:600;">${esc(fullName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:13px;">E-mail</td>
                    <td style="padding:6px 0;"><a href="mailto:${esc(email)}" style="color:#126a9b;font-weight:600;text-decoration:none;">${esc(email)}</a></td>
                  </tr>
                  ${
                    telephone
                      ? `<tr>
                    <td style="padding:6px 0;color:#6b7280;font-size:13px;">Téléphone</td>
                    <td style="padding:6px 0;"><a href="tel:${esc(telephone.replace(/\s+/g, ""))}" style="color:#126a9b;font-weight:600;text-decoration:none;">${esc(telephone)}</a></td>
                  </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>

            <!-- Services concernés -->
            ${servicesHtml}

            <!-- Projet -->
            <tr>
              <td style="padding:24px 32px 8px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1786c2;margin-bottom:12px;">Projet</div>
                <div style="background:#f4f7fa;border-left:3px solid #1fa2e6;padding:16px 18px;border-radius:0 8px 8px 0;font-size:15px;line-height:1.6;color:#0d1825;white-space:pre-wrap;">${esc(message)}</div>
              </td>
            </tr>

            <!-- Consentement RGPD -->
            <tr>
              <td style="padding:24px 32px 8px;">
                <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1786c2;margin-bottom:12px;">Consentement RGPD</div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;">
                  <tr>
                    <td style="padding:14px 18px;vertical-align:top;width:36px;">
                      <div style="width:22px;height:22px;border-radius:6px;background:#10b981;color:#ffffff;text-align:center;line-height:22px;font-size:14px;font-weight:700;">&#10003;</div>
                    </td>
                    <td style="padding:14px 18px 14px 0;font-size:14px;line-height:1.55;color:#064e3b;">
                      <strong style="display:block;margin-bottom:4px;color:#047857;">Case cochée par le visiteur</strong>
                      ${esc(consentText)}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Quick action -->
            <tr>
              <td style="padding:24px 32px 32px;">
                <a href="mailto:${esc(email)}?subject=${esc(encodeURIComponent("Re: votre demande de devis — Daniel-Lux"))}" style="display:inline-block;background:#1fa2e6;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:8px;">Répondre à ${esc(prenom || nom)} →</a>
                <p style="margin:12px 0 0;font-size:12px;color:#6b7280;">Vous pouvez aussi simplement répondre à cet e-mail : le champ Reply-To pointe sur ${esc(email)}.</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#0a1626;padding:18px 32px;color:#8896a8;font-size:12px;line-height:1.5;">
                <strong style="color:#ffffff;">${esc(siteConfig.legalName)}</strong> — ${esc(siteConfig.address.street)}, ${esc(siteConfig.address.postalCode)} ${esc(siteConfig.address.locality)}<br>
                Tél. ${esc(siteConfig.phoneDisplay)} · <a href="${siteConfig.url}" style="color:#8896a8;text-decoration:underline;">${esc(siteConfig.url.replace(/^https?:\/\//, ""))}</a><br>
                <span style="opacity:0.7;">Message généré automatiquement par le formulaire de contact du site.</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    const result = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return NextResponse.json(
        { error: "L'envoi a échoué. Veuillez réessayer ou nous contacter directement." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] Resend exception:", err);
    return NextResponse.json(
      { error: "L'envoi a échoué. Veuillez réessayer ou nous contacter directement." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { error: "Méthode non autorisée." },
    { status: 405 },
  );
}
