import Image from "next/image";
import { ServiceIcon, CheckIcon } from "./icons";
import { JsonLd } from "./JsonLd";
import { serviceSchema } from "@/lib/schema";
import type { Service } from "@/lib/services";

/**
 * Service card for the one-pager grid. Carries its own anchor id (= slug) so
 * footer/nav links like /#peinture scroll here, plus a Service JSON-LD block.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      id={service.slug}
      className="group flex flex-col overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-xl"
    >
      <JsonLd data={serviceSchema(service)} />

      <div className="relative aspect-[4/3] overflow-hidden bg-night">
        <Image
          src={service.heroImage}
          alt={`${service.title} — Daniel-Lux`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/10 to-transparent"
          aria-hidden="true"
        />
        <span
          className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl bg-white/95 text-accent shadow-lg ring-1 ring-black/5"
          aria-hidden="true"
        >
          <ServiceIcon name={service.icon} className="h-6 w-6" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-night">
          {service.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {service.excerpt}
        </p>
        <ul className="mt-4 space-y-2 border-t border-paper-200 pt-4">
          {service.prestations.map((p) => (
            <li
              key={p.title}
              className="flex items-start gap-2 text-sm text-ink-soft"
            >
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {p.title}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
