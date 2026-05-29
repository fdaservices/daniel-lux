import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { faqItems } from "@/lib/faq";

export const dynamic = "force-static";

/**
 * llms-full.txt — full textual contents of the site for AI assistants.
 * URLs derive from siteConfig so a domain change propagates here too.
 */
export function GET() {
  const base = siteConfig.url;
  const addr = siteConfig.address;

  const body = `# ${siteConfig.name} — Contenu complet du site

> ${siteConfig.legalName} — entreprise de construction, de rénovation et d'aménagement basée à ${addr.locality} (${addr.nearCity}), au ${addr.country}. Tous les métiers du bâtiment sous un même toit.

Ce document rassemble l'intégralité du contenu textuel du site ${base.replace(/^https?:\/\//, "")}, destiné aux assistants IA et aux moteurs de recherche.

---

## L'entreprise

Chez Daniel-Lux, nous sommes fiers de mettre notre expertise en matière de construction, de rénovation et d'aménagement au service de nos clients. Forts de nombreuses années d'expérience, nous sommes devenus un acteur de référence de l'industrie du bâtiment au Luxembourg, prêts à transformer vos rêves en réalité, que ce soit pour un projet de grande envergure ou de plus petite taille.

Points clés :
- Tous les corps de métier du bâtiment maîtrisés en interne, un seul interlocuteur.
- Intervention pour les particuliers comme pour les professionnels.
- Projets de toutes tailles, sur l'ensemble du ${siteConfig.serviceArea}.
- Membre associé de la ${siteConfig.membership.name}.
- Devis et conseils gratuits, sans engagement.
- Équipe parlant ${siteConfig.languages.join(", ").toLowerCase()}.

Engagement qualité : nous nous engageons à utiliser les meilleurs matériaux, à respecter les normes de sécurité les plus strictes et à travailler en étroite collaboration avec nos clients pour garantir leur satisfaction. Notre équipe dévouée et passionnée est prête à relever tous les défis.

Coordonnées :
- Raison sociale : ${siteConfig.legalName}
- Adresse : ${addr.street}, ${addr.postalCode} ${addr.locality}, ${addr.country}
- Téléphone : ${siteConfig.phone}
- E-mail : ${siteConfig.email}
- Horaires : lundi à vendredi de 08h00 à 12h00 et de 13h00 à 17h00 ; fermé le samedi et le dimanche.

---

## Nos domaines d'expertise

Daniel-Lux maîtrise huit corps de métier complémentaires :

${services
  .map(
    (s, i) => `### ${i + 1}. ${s.title}

${s.metaDescription}

Prestations :
${s.prestations.map((p) => `- ${p.title}`).join("\n")}

URL : ${base}/#${s.slug}`,
  )
  .join("\n\n")}

---

## Comment ça marche

1. Prise de contact — vous nous parlez de votre projet par téléphone ou via le formulaire.
2. Visite & étude — nous évaluons vos besoins sur place et vous conseillons.
3. Devis gratuit — vous recevez une proposition détaillée, claire et sans engagement.
4. Réalisation — nous menons le chantier jusqu'à la finition et le nettoyage final.

---

## Questions fréquentes (FAQ)

${faqItems.map((f) => `**${f.question}**\n${f.answer}`).join("\n\n")}

---

## Contact

${siteConfig.legalName}
${addr.street}, ${addr.postalCode} ${addr.locality}, ${addr.country}
Téléphone : ${siteConfig.phone}
E-mail : ${siteConfig.email}
Devis gratuit : ${base}/#contact
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
