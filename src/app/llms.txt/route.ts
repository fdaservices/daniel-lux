import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

export const dynamic = "force-static";

/**
 * llms.txt — short index for AI assistants (https://llmstxt.org).
 * Generated from siteConfig + services so a domain change is automatic.
 */
export function GET() {
  const base = siteConfig.url;
  const addr = siteConfig.address;

  const sections: { name: string; anchor: string; summary: string }[] = [
    { name: "L'entreprise", anchor: "#entreprise", summary: "présentation de Daniel-Lux et de son expertise du bâtiment." },
    { name: "Nos services", anchor: "#services", summary: "les 8 corps de métier de la construction et de la rénovation." },
    { name: "Réalisations", anchor: "#realisations", summary: "aperçu du savoir-faire en images." },
    { name: "Pourquoi nous", anchor: "#avantages", summary: "engagements qualité et garanties." },
    { name: "FAQ", anchor: "#faq", summary: "réponses sur les devis, zones d'intervention et garanties." },
    { name: "Contact", anchor: "#contact", summary: "coordonnées, horaires et formulaire de demande de devis." },
  ];

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.legalName} — entreprise de construction, de rénovation et d'aménagement basée à ${addr.locality} (${addr.nearCity}), au ${addr.country}. Daniel-Lux maîtrise l'ensemble des métiers du bâtiment : gros œuvre, rénovation, isolation, carrelage et parquet, nettoyage, peinture, faux plafonds et démolition.`,
    "",
    `Daniel-Lux met de nombreuses années d'expérience au service des particuliers comme des professionnels, pour des projets de toutes tailles, sur l'ensemble du ${siteConfig.serviceArea}. Membre associé de la ${siteConfig.membership.name}. Devis gratuits et sans engagement. Équipe parlant ${siteConfig.languages.join(", ").toLowerCase()}.`,
    "",
    `- Adresse : ${addr.street}, ${addr.postalCode} ${addr.locality}, ${addr.country}`,
    `- Téléphone : ${siteConfig.phone}`,
    `- E-mail : ${siteConfig.email}`,
    `- Horaires : lundi à vendredi 08h00–12h00 et 13h00–17h00 ; samedi et dimanche fermé`,
    "",
    "## Site (one-pager)",
    "",
    ...sections.map((s) => `- [${s.name}](${base}/${s.anchor}): ${s.summary}`),
    "",
    "## Nos services",
    "",
    ...services.map((s) => `- [${s.name}](${base}/#${s.slug}): ${s.excerpt}`),
    "",
    "## Ressources",
    "",
    `- [Version détaillée pour les IA](${base}/llms-full.txt): contenu complet du site en texte.`,
    `- [Plan du site (XML)](${base}/sitemap.xml): pages indexables.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
