import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Page introuvable (404)",
  description:
    "La page demandée n'existe pas ou a été déplacée. Retrouvez les services de Daniel-Lux.",
  robots: { index: false, follow: true },
};

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#entreprise", label: "L'entreprise" },
  { href: "/#services", label: "Nos services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-7xl font-extrabold text-accent sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-night sm:text-4xl">
          Cette page est introuvable
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          La page que vous recherchez n&apos;existe pas, a été déplacée ou
          n&apos;est plus disponible. Reprenez votre navigation à l&apos;aide des
          liens ci-dessous.
        </p>

        <nav aria-label="Liens utiles" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full border border-paper-200 bg-white px-4 py-2 text-sm font-semibold text-night transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Nos services
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/#${service.slug}`}
                  className="block rounded-lg border border-paper-200 bg-white px-4 py-3 text-sm font-semibold text-night transition-colors hover:border-accent hover:text-accent"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/#contact"
          className="mt-12 flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-600"
        >
          Demander un devis gratuit
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
