import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";
import { ContactForm } from "@/components/ContactForm";
import { Gallery, type GalleryImage } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  ShieldIcon,
  StarIcon,
} from "@/components/icons";
import { services } from "@/lib/services";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site";
import { pageSchema, faqSchema } from "@/lib/schema";
import { buildOpenGraph, buildTwitter } from "@/lib/seo";

const homeTitle =
  "Daniel-Lux | Construction, rénovation & aménagement au Luxembourg";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: buildOpenGraph({
    path: "/",
    title: homeTitle,
    description: siteConfig.description,
  }),
  twitter: buildTwitter({
    title: homeTitle,
    description: siteConfig.description,
  }),
};

const stats = [
  { value: "8", label: "Corps de métier maîtrisés" },
  { value: "100%", label: "Travaux sur mesure" },
  { value: "Gratuit", label: "Devis & conseils" },
  { value: "Grand-Duché", label: "Zone d'intervention" },
];

const engagements = [
  {
    title: "Matériaux de qualité",
    text: "Nous sélectionnons les meilleurs matériaux pour des ouvrages solides et durables.",
  },
  {
    title: "Normes de sécurité strictes",
    text: "Chaque chantier respecte les normes de sécurité les plus exigeantes.",
  },
  {
    title: "Un seul interlocuteur",
    text: "Du gros œuvre à la peinture, nous coordonnons tous les corps de métier pour vous.",
  },
  {
    title: "Collaboration étroite",
    text: "Nous travaillons main dans la main avec vous pour garantir votre satisfaction.",
  },
  {
    title: "Équipe dévouée",
    text: "Des professionnels passionnés, prêts à relever tous les défis, quelle que soit la taille.",
  },
  {
    title: "Délais maîtrisés",
    text: "Une organisation rigoureuse pour livrer vos projets dans les temps.",
  },
];

const process = [
  {
    step: "01",
    title: "Prise de contact",
    text: "Vous nous parlez de votre projet par téléphone ou via le formulaire.",
  },
  {
    step: "02",
    title: "Visite & étude",
    text: "Nous évaluons vos besoins sur place et vous conseillons.",
  },
  {
    step: "03",
    title: "Devis gratuit",
    text: "Vous recevez une proposition détaillée, claire et sans engagement.",
  },
  {
    step: "04",
    title: "Réalisation",
    text: "Nous menons le chantier jusqu'à la finition et le nettoyage final.",
  },
];

/** Realisations gallery — dedicated finished-project photography, no captions. */
const realisations: GalleryImage[] = [
  { src: "/images/realisations/realisation-1.webp", alt: "Cuisine moderne rénovée par Daniel-Lux" },
  { src: "/images/realisations/realisation-2.webp", alt: "Salle de bain contemporaine carrelée par Daniel-Lux" },
  { src: "/images/realisations/realisation-3.webp", alt: "Salon lumineux repeint avec parquet par Daniel-Lux" },
  { src: "/images/realisations/realisation-4.webp", alt: "Façade de maison rénovée par Daniel-Lux" },
  { src: "/images/realisations/realisation-5.webp", alt: "Escalier en chêne et verre réalisé par Daniel-Lux" },
  { src: "/images/realisations/realisation-6.webp", alt: "Pièce avec faux plafond et éclairage LED par Daniel-Lux" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          pageSchema("WebPage", {
            name: homeTitle,
            description: siteConfig.description,
            path: "/",
          }),
          faqSchema(),
        ]}
      />

      {/* ---------- Hero ---------- */}
      <section className="relative isolate overflow-hidden bg-night">
        <Image
          src="/images/hero-daniel-lux.webp"
          alt="Intérieur moderne rénové par Daniel-Lux au Luxembourg"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-night via-night/95 to-night/60"
          aria-hidden="true"
        />
        <div
          className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="wrap relative py-24 sm:py-32 lg:py-40">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-night-600 bg-night-800/60 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            <span className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </span>
            Noté 5 étoiles sur Google
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Votre partenaire de confiance pour la{" "}
            <span className="text-accent">construction</span> et la{" "}
            <span className="text-accent">rénovation</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel-300">
            Chez Daniel-Lux, nous mettons notre expertise du bâtiment à votre
            service au Luxembourg. Du gros œuvre à la peinture, nous transformons
            vos rêves en réalité — pièce par pièce, brique par brique.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-600"
            >
              Demander un devis gratuit
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/#services"
              className="flex items-center gap-2 rounded-md border border-night-600 bg-night-800/70 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:border-accent hover:text-accent"
            >
              Découvrir nos services
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-steel-300">
            {[
              "Devis gratuit & sans engagement",
              "Tous corps de métier",
              "Particuliers & professionnels",
            ].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-accent" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="border-b border-paper-200 bg-paper">
        <div className="wrap grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-paper-200 px-4 py-8 text-center [&:nth-child(-n+2)]:border-b [&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <p className="font-display text-3xl font-extrabold text-accent sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Entreprise ---------- */}
      <section id="entreprise" className="wrap py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-paper-200 shadow-xl">
            <Image
              src="/images/about-daniel-lux.webp"
              alt="Artisans de Daniel-Lux au travail sur un chantier de rénovation au Luxembourg"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="L'entreprise"
              title="Bienvenue chez Daniel-Lux"
            />
            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Chez Daniel-Lux, nous sommes fiers de mettre notre expertise en
                matière de construction, de rénovation et d&apos;aménagement à
                votre service. Forts de nombreuses années d&apos;expérience, nous
                sommes devenus un acteur de référence de l&apos;industrie du
                bâtiment au Luxembourg.
              </p>
              <p>
                Que ce soit pour un projet de grande envergure ou de plus petite
                taille, nous sommes prêts à transformer vos rêves en réalité.
                Notre équipe dévouée et passionnée relève chaque défi avec la même
                exigence de qualité.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 rounded-md bg-night px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-night-800"
              >
                Nos domaines d&apos;expertise
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-md border border-paper-200 px-6 py-3 text-sm font-bold text-night transition-colors hover:border-accent hover:text-accent"
              >
                <PhoneIcon className="h-4 w-4 text-accent" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="bg-paper py-20 sm:py-24">
        <div className="wrap-wide">
          <SectionHeading
            eyebrow="Nos domaines d'expertise"
            title="Tous les métiers du bâtiment sous un même toit"
            intro="De la première pierre aux finitions, Daniel-Lux maîtrise l'ensemble de la chaîne de construction et de rénovation."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Réalisations ---------- */}
      <section id="realisations" className="wrap-wide py-20 sm:py-24">
        <SectionHeading
          eyebrow="Réalisations"
          title="Le savoir-faire Daniel-Lux en images"
          intro="Un aperçu de la qualité et du soin que nous apportons à chaque chantier. Cliquez sur une image pour l'agrandir."
          align="center"
        />
        <div className="mt-12">
          <Gallery images={realisations} />
        </div>
      </section>

      {/* ---------- Avantages / Engagements ---------- */}
      <section id="avantages" className="bg-night py-20 sm:py-24">
        <div className="wrap">
          <SectionHeading
            eyebrow="Notre engagement"
            title="La qualité, notre priorité"
            intro="Nous nous engageons à utiliser les meilleurs matériaux, à respecter les normes les plus strictes et à travailler en étroite collaboration avec nos clients."
            align="center"
            tone="dark"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {engagements.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-night-700 bg-night-800/60 p-6 transition-colors hover:border-accent/50"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"
                  aria-hidden="true"
                >
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Processus ---------- */}
      <section className="wrap py-20 sm:py-24">
        <SectionHeading
          eyebrow="Comment ça marche"
          title="Votre projet en 4 étapes simples"
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-paper-200 bg-white p-6"
            >
              <span className="font-display text-5xl font-extrabold text-paper-200">
                {item.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-night">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Trust band ---------- */}
      <section className="bg-paper">
        <div className="wrap flex flex-col items-center gap-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-white"
              aria-hidden="true"
            >
              <ShieldIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-night">
                {siteConfig.membership.name}
              </p>
              <p className="text-sm text-ink-soft">
                Daniel-Lux est {siteConfig.membership.role.toLowerCase()} — un
                gage de sérieux et de professionnalisme.
              </p>
            </div>
          </div>
          <div className="shrink-0 rounded-xl border border-paper-200 bg-white px-7 py-4 shadow-sm">
            <Image
              src="/images/fda-logo.webp"
              alt="Fédération des Artisans"
              width={142}
              height={52}
              className="h-12 w-auto"
            />
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="wrap py-20 sm:py-24">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout ce que vous devez savoir"
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-paper-200 rounded-2xl border border-paper-200 bg-white">
          {faqItems.map((item) => (
            <details key={item.question} className="group px-6">
              <summary className="flex items-center justify-between gap-4 py-5 text-left font-display text-base font-bold text-night">
                {item.question}
                <span
                  className="faq-plus grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-transform duration-200"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="bg-night py-20 sm:py-24">
        <div className="wrap-wide grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Parlons de votre projet"
              intro="N'hésitez pas à nous contacter pour discuter de vos idées et de vos besoins. Nous revenons vers vous rapidement."
              tone="dark"
            />
            <div className="mt-8 space-y-4">
              <a
                href={siteConfig.phoneHref}
                className="flex items-start gap-4 rounded-2xl border border-night-700 bg-night-800/60 p-5 transition-colors hover:border-accent/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-steel-300">
                    Téléphone
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-bold text-white">
                    {siteConfig.phoneDisplay}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-start gap-4 rounded-2xl border border-night-700 bg-night-800/60 p-5 transition-colors hover:border-accent/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <MailIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-steel-300">
                    E-mail
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-bold text-white">
                    {siteConfig.email}
                  </span>
                </span>
              </a>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-4 rounded-2xl border border-night-700 bg-night-800/60 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-steel-300">
                      Adresse
                    </span>
                    <span className="mt-0.5 block text-sm text-steel-300">
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.postalCode}{" "}
                      {siteConfig.address.locality}
                    </span>
                  </span>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-night-700 bg-night-800/60 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <ClockIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-steel-300">
                      Horaires
                    </span>
                    <span className="mt-0.5 block text-sm text-steel-300">
                      Lun–Ven : 08h–12h · 13h–17h
                      <br />
                      Sam & dim : fermé
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <h3 className="font-display text-xl font-bold text-night">
              Demande de devis gratuit
            </h3>
            <p className="mt-1.5 text-sm text-ink-soft">
              Décrivez-nous votre projet, nous vous recontactons rapidement.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/*
            Google Maps — localisation réelle de Daniel-Lux.
            Consent-gated the Iubenda way: no `src` until consent — Iubenda copies
            `data-suppressedsrc` into `src` once the visitor accepts (purpose 3).
            This keeps the embed GDPR-blocked and avoids a hydration mismatch.
          */}
          <div className="overflow-hidden rounded-2xl border border-night-700 shadow-2xl lg:col-span-2">
            <iframe
              data-suppressedsrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2574.7374517190187!2d5.768185076799524!3d49.809803433284124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47eaa795b78170a7%3A0xe0d984a741a31d81!2sDaniel-Lux!5e0!3m2!1sen!2slu!4v1780046584645!5m2!1sen!2slu"
              data-iub-purposes="3"
              title="Carte — Daniel-Lux, 37 Rue de Holtz, L-8826 Perlé"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="_iub_cs_activate block h-[450px] w-full"
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
