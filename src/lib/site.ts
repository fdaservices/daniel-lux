/**
 * Central site configuration — single source of truth for SEO, schema markup,
 * contact data and the static text/asset files (llms.txt, humans.txt, sitemap…).
 *
 * To move the site to its final domain, change `url` below: every metadata tag,
 * canonical URL, sitemap entry and JSON-LD block derives from it.
 */
export const siteConfig = {
  name: "Daniel-Lux",
  legalName: "Daniel-Lux Sàrl-s",
  brandSuffix: "Entreprise",
  url: "https://daniel-lux.lu",
  locale: "fr_LU",
  lang: "fr",

  tagline: "Construction, rénovation & aménagement au Luxembourg",
  description:
    "Daniel-Lux, votre partenaire de confiance pour la construction, la rénovation et l'aménagement au Luxembourg : gros œuvre, peinture, isolation, carrelage, faux plafonds, nettoyage et démolition. Devis gratuit.",

  email: "contact@daniel-lux.lu",
  phone: "+352 661 80 08 01",
  phoneHref: "tel:+352661800801",
  phoneDisplay: "661 80 08 01",

  address: {
    street: "37, Rue de Holtz",
    postalCode: "L-8826",
    locality: "Perlé",
    nearCity: "Rambrouch",
    /** Canton — used as schema.org addressRegion. */
    region: "Redange",
    country: "Luxembourg",
    countryCode: "LU",
  },
  geo: { latitude: 49.8098, longitude: 5.7682 },

  /** Opening hours — used in the Contact section and in LocalBusiness schema. */
  openingHours: [
    { days: "Lundi – Vendredi", hours: "08h00 – 12h00 · 13h00 – 17h00" },
    { days: "Samedi", hours: "Fermé" },
    { days: "Dimanche", hours: "Fermé" },
  ],
  /** schema.org openingHoursSpecification format. */
  openingHoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:00",
      closes: "17:00",
    },
  ],

  languages: ["Français", "Luxembourgeois", "Allemand", "Anglais"],
  serviceArea: "Grand-Duché de Luxembourg",

  ogImage: "/images/og-daniel-lux.jpg",

  /**
   * Professional membership — displayed for trust and used in schema (memberOf).
   */
  membership: {
    name: "Fédération des Artisans",
    role: "Membre associé (FDA)",
  },

  /**
   * Social / external profiles for "social profiling" (schema.org sameAs and
   * rel=me links). Add the company's real profile URLs here when available.
   */
  sameAs: [] as string[],

  /** Third-party tracking & consent IDs — referenced by the root layout & footer. */
  tracking: {
    /** Iubenda cookie/privacy solution. */
    iubenda: {
      siteId: 4548390,
      cookiePolicyId: 32887901,
    },
    /** Google Tag Manager container ID. */
    gtmId: "GTM-TJ8BW6SX",
  },
} as const;

export type SiteConfig = typeof siteConfig;
