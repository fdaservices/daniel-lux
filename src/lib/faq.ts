/** Shared FAQ — rendered as an accordion and as FAQPage JSON-LD for rich results. */
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Le devis est-il gratuit et sans engagement ?",
    answer:
      "Oui. Chez Daniel-Lux, l'étude de votre projet et le devis sont entièrement gratuits et sans aucun engagement. Nous nous déplaçons pour évaluer vos besoins, puis vous remettons une proposition détaillée et transparente.",
  },
  {
    question: "Dans quelles régions intervenez-vous ?",
    answer:
      "Nous intervenons sur l'ensemble du Grand-Duché de Luxembourg, ainsi que dans les régions frontalières proches. Notre entreprise est basée à Perlé (commune de Rambrouch).",
  },
  {
    question: "Réalisez-vous aussi bien les petits que les grands projets ?",
    answer:
      "Absolument. Qu'il s'agisse d'un simple rafraîchissement de peinture ou d'un chantier de construction de grande envergure, nous mettons la même exigence de qualité au service de chaque projet, pour les particuliers comme pour les professionnels.",
  },
  {
    question: "Coordonnez-vous tous les corps de métier ?",
    answer:
      "Oui. Du gros œuvre à la peinture, en passant par l'isolation, le carrelage et les faux plafonds, nous maîtrisons l'ensemble des métiers du bâtiment. Vous n'avez qu'un seul interlocuteur pour l'ensemble de votre chantier.",
  },
  {
    question: "Quels matériaux et garanties proposez-vous ?",
    answer:
      "Nous nous engageons à utiliser des matériaux de qualité et à respecter les normes de sécurité les plus strictes. Chaque chantier est mené en étroite collaboration avec vous afin de garantir votre entière satisfaction.",
  },
  {
    question: "Comment vous contacter pour démarrer un projet ?",
    answer:
      "Appelez-nous au 661 80 08 01, écrivez-nous à contact@daniel-lux.lu, ou remplissez le formulaire de contact en bas de page. Nous revenons vers vous rapidement pour discuter de vos idées.",
  },
];
