import Link from "next/link";
import { LogoWordmark } from "./Logo";
import { services } from "@/lib/services";
import { mainNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, ShieldIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  const { iubenda } = siteConfig.tracking;

  return (
    <footer className="bg-night text-steel-300">
      <div className="wrap-wide grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        {/* Brand */}
        <div className="lg:col-span-4">
          <LogoWordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Construction, rénovation et aménagement au Luxembourg. Votre
            partenaire de confiance pour transformer vos projets en réalité,
            pièce par pièce, brique par brique.
          </p>
          <div className="mt-5 flex flex-col gap-2 text-sm">
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <PhoneIcon className="h-4 w-4 text-accent" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <MailIcon className="h-4 w-4 text-accent" />
              {siteConfig.email}
            </a>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-night-700 bg-night-800 px-3 py-1.5 text-xs font-semibold text-steel-300">
            <ShieldIcon className="h-4 w-4 text-accent" />
            {siteConfig.membership.name} — {siteConfig.membership.role}
          </p>
        </div>

        {/* Services */}
        <nav aria-label="Nos services" className="lg:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Nos services
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/#${service.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Navigation */}
        <nav aria-label="Liens utiles" className="lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Navigation
          </h2>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Coordonnées
          </h2>
          <address className="mt-4 flex flex-col gap-3 text-sm not-italic">
            <span className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.locality}
                <br />
                {siteConfig.address.country}
              </span>
            </span>
            <span className="flex items-start gap-2">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                Lun–Ven : 08h–12h · 13h–17h
                <br />
                Samedi & dimanche : fermé
              </span>
            </span>
          </address>
        </div>
      </div>

      <div className="border-t border-night-700">
        <div className="wrap-wide flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row sm:flex-wrap">
          <p>
            © {year} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <li>
              <a
                href={`https://www.iubenda.com/privacy-policy/${iubenda.cookiePolicyId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Politique de confidentialité
              </a>
            </li>
            <li>
              <a
                href={`https://www.iubenda.com/privacy-policy/${iubenda.cookiePolicyId}/cookie-policy`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                Politique de cookies
              </a>
            </li>
            <li>
              {/* Iubenda hooks onto this class to re-open the preferences modal. */}
              <a
                href="#"
                className="iubenda-cs-preferences-link transition-colors hover:text-accent"
              >
                Préférences de cookies
              </a>
            </li>
          </ul>
          <p className="text-steel-300">
            Construction · Rénovation · Aménagement — {siteConfig.address.locality},{" "}
            {siteConfig.address.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
