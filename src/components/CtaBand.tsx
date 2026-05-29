import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { PhoneIcon, ArrowRightIcon } from "./icons";

/** Recurring "request a quote" call-to-action band. */
export function CtaBand({
  title = "Un projet de construction ou de rénovation ? Parlons-en.",
  text = "Transmettez-nous vos idées et vos besoins. Chez Daniel-Lux, nous transformons vos rêves en réalité — devis gratuit et sans engagement, réponse rapide.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-night">
      <div className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="wrap relative py-16 text-center sm:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Devis gratuit
        </p>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-steel-300">
          {text}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/#contact"
            className="flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-600"
          >
            Demander un devis
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 rounded-md border border-night-600 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-accent hover:text-accent"
          >
            <PhoneIcon className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
