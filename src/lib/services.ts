/**
 * The eight core trades of Daniel-Lux. Single source of truth for the services
 * grid, the per-service JSON-LD, the sitemap, llms.txt and the footer.
 *
 * `slug` doubles as the in-page anchor id on the one-pager (e.g. #peinture).
 */
export interface Prestation {
  title: string;
}

export interface Service {
  slug: string;
  /** Icon key understood by <ServiceIcon name=… /> */
  icon: string;
  /** Short label (cards, nav, footer). */
  name: string;
  /** Full editorial title. */
  title: string;
  /** One-line teaser used on cards and in llms.txt. */
  excerpt: string;
  /** SEO/Schema description. */
  metaDescription: string;
  /** Generated illustration (public/images/services/…). */
  heroImage: string;
  /** Concrete deliverables, surfaced in schema and the detail panel. */
  prestations: Prestation[];
}

export const services: Service[] = [
  {
    slug: "gros-oeuvre",
    icon: "structure",
    name: "Gros œuvre",
    title: "Gros œuvre & fondations",
    excerpt:
      "Des bases solides pour votre projet, du terrassement aux fondations.",
    metaDescription:
      "Gros œuvre au Luxembourg par Daniel-Lux : terrassement, fondations, maçonnerie et structures porteuses réalisés par des équipes qualifiées.",
    heroImage: "/images/services/gros-oeuvre.webp",
    prestations: [
      { title: "Terrassement et préparation du terrain" },
      { title: "Fondations et dalles béton" },
      { title: "Maçonnerie et murs porteurs" },
      { title: "Structures et ouvrages en béton" },
    ],
  },
  {
    slug: "renovation",
    icon: "renovation",
    name: "Rénovation",
    title: "Rénovation résidentielle & commerciale",
    excerpt:
      "Redonner vie à un espace existant, du studio au bâtiment commercial.",
    metaDescription:
      "Rénovation complète au Luxembourg : Daniel-Lux modernise et transforme vos espaces résidentiels et commerciaux, du diagnostic à la finition.",
    heroImage: "/images/services/renovation.webp",
    prestations: [
      { title: "Rénovation complète d'appartements et maisons" },
      { title: "Réaménagement d'espaces commerciaux" },
      { title: "Mise aux normes et modernisation" },
      { title: "Coordination de tous les corps de métier" },
    ],
  },
  {
    slug: "isolation",
    icon: "insulation",
    name: "Isolation",
    title: "Isolation thermique & acoustique",
    excerpt:
      "Des solutions performantes pour un habitat confortable et économe.",
    metaDescription:
      "Isolation thermique et acoustique au Luxembourg par Daniel-Lux : solutions performantes pour réduire vos factures et améliorer votre confort.",
    heroImage: "/images/services/isolation.webp",
    prestations: [
      { title: "Isolation thermique des murs et toitures" },
      { title: "Isolation acoustique" },
      { title: "Isolation par l'intérieur et l'extérieur" },
      { title: "Amélioration de l'efficacité énergétique" },
    ],
  },
  {
    slug: "carrelage-parquet",
    icon: "tiling",
    name: "Carrelage & parquet",
    title: "Carrelage & parquet",
    excerpt:
      "Des sols qui deviennent des œuvres d'art, du carrelage au parquet.",
    metaDescription:
      "Pose de carrelage et de parquet au Luxembourg : Daniel-Lux réalise des sols élégants et durables grâce à des artisans chevronnés.",
    heroImage: "/images/services/carrelage-parquet.webp",
    prestations: [
      { title: "Pose de carrelage sol et mur" },
      { title: "Pose de parquet et stratifié" },
      { title: "Faïence salle de bain et cuisine" },
      { title: "Finitions, joints et plinthes" },
    ],
  },
  {
    slug: "nettoyage",
    icon: "cleaning",
    name: "Nettoyage",
    title: "Nettoyage de fin de chantier",
    excerpt:
      "Profitez immédiatement de votre nouvel espace, sans tracas ni souci.",
    metaDescription:
      "Nettoyage de fin de chantier au Luxembourg : après chaque projet, Daniel-Lux livre des espaces propres et prêts à vivre.",
    heroImage: "/images/services/nettoyage.webp",
    prestations: [
      { title: "Nettoyage de fin de chantier" },
      { title: "Dépoussiérage et évacuation des déchets" },
      { title: "Nettoyage des sols et vitres" },
      { title: "Remise en état complète" },
    ],
  },
  {
    slug: "peinture",
    icon: "painting",
    name: "Peinture",
    title: "Peinture intérieure & extérieure",
    excerpt:
      "Les couleurs ont le pouvoir de transformer un espace. Donnons vie à votre vision.",
    metaDescription:
      "Peinture intérieure et extérieure au Luxembourg : Daniel-Lux choisit et applique les meilleures finitions pour sublimer vos murs et façades.",
    heroImage: "/images/services/peinture.webp",
    prestations: [
      { title: "Peinture murale et plafonds" },
      { title: "Peinture de façade" },
      { title: "Enduits décoratifs et effets" },
      { title: "Préparation et traitement des supports" },
    ],
  },
  {
    slug: "faux-plafonds",
    icon: "ceiling",
    name: "Faux plafonds",
    title: "Faux plafonds & cloisons",
    excerpt:
      "Une esthétique moderne et un meilleur contrôle de l'acoustique.",
    metaDescription:
      "Faux plafonds et cloisons sèches au Luxembourg : Daniel-Lux conçoit des plafonds modernes intégrant éclairage et confort acoustique.",
    heroImage: "/images/services/faux-plafonds.webp",
    prestations: [
      { title: "Faux plafonds suspendus" },
      { title: "Plafonds acoustiques et décoratifs" },
      { title: "Intégration d'éclairage LED" },
      { title: "Cloisons sèches et placo" },
    ],
  },
  {
    slug: "demolition",
    icon: "demolition",
    name: "Démolition",
    title: "Démolition & déconstruction",
    excerpt:
      "Préparer le terrain pour de nouvelles possibilités, en toute sécurité.",
    metaDescription:
      "Démolition et déconstruction au Luxembourg : Daniel-Lux intervient de manière sûre et efficace pour préparer vos futurs aménagements.",
    heroImage: "/images/services/demolition.webp",
    prestations: [
      { title: "Démolition partielle ou totale" },
      { title: "Déconstruction sélective" },
      { title: "Évacuation et tri des gravats" },
      { title: "Sécurisation du chantier" },
    ],
  },
];
