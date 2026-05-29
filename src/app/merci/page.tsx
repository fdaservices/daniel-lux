import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckIcon, ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merci pour votre message",
  description: "Votre demande a bien été transmise à Daniel-Lux.",
  alternates: { canonical: "/merci" },
  robots: { index: false, follow: true },
};

export default function MerciPage() {
  return (
    <section className="bg-paper">
      <div className="wrap pt-8">
        <Breadcrumbs items={[{ name: "Merci", path: "/merci" }]} />
      </div>
      <div className="wrap flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
        <span
          className="grid h-20 w-20 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/20"
          aria-hidden="true"
        >
          <CheckIcon className="h-10 w-10" />
        </span>
        <h1 className="mt-8 font-display text-3xl font-extrabold text-night sm:text-4xl">
          Merci pour votre message
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
          Votre demande a bien été transmise à Daniel-Lux. Notre équipe
          l&apos;étudie et revient vers vous dans les meilleurs délais avec un
          devis gratuit et sans engagement.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Besoin d&apos;une réponse rapide ? Appelez-nous directement.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-600"
          >
            Retour à l&apos;accueil
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 rounded-md border border-paper-200 bg-white px-7 py-3.5 text-sm font-bold text-night transition-colors hover:border-accent hover:text-accent"
          >
            <PhoneIcon className="h-4 w-4 text-accent" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
        <Link
          href="/#services"
          className="mt-8 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
        >
          Découvrir nos domaines d&apos;expertise
        </Link>
      </div>
    </section>
  );
}
