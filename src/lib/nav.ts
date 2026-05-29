/**
 * In-page navigation for the one-pager. Each entry points to a section anchor
 * on the home page. The Header consumes this list on both desktop and mobile.
 */
export interface NavLink {
  href: string;
  label: string;
}

export const mainNav: NavLink[] = [
  { href: "/#entreprise", label: "L'entreprise" },
  { href: "/#services", label: "Nos services" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#avantages", label: "Pourquoi nous" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];
