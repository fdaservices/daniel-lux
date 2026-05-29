/**
 * Structured-data (JSON-LD / schema.org) builders.
 * Rendered into pages via the <JsonLd /> component for rich results and to help
 * search engines and AI assistants understand the site.
 */
import { siteConfig } from "./site";
import { services, type Service } from "./services";
import { faqItems } from "./faq";

const BASE = siteConfig.url;
const BUSINESS_ID = `${BASE}/#business`;

const langCodes = ["fr", "lb", "de", "en"];

/** Core company entity — LocalBusiness specialised as a construction business. */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: BASE,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    slogan: siteConfig.tagline,
    image: `${BASE}${siteConfig.ogImage}`,
    logo: `${BASE}/images/icon-512.png`,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Espèces, Virement bancaire",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postalCode,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.locality}, ${siteConfig.address.country}`,
    )}`,
    areaServed: { "@type": "Country", name: siteConfig.address.country },
    knowsLanguage: langCodes,
    memberOf: {
      "@type": "Organization",
      name: siteConfig.membership.name,
    },
    openingHoursSpecification: siteConfig.openingHoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Nos services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${BASE}/#${s.slug}`,
        },
      })),
    },
  };
}

/** WebSite entity, linked back to the business as publisher. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: siteConfig.name,
    inLanguage: "fr-LU",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** Breadcrumb trail — pair with the visual <Breadcrumbs /> component. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}

/** Per-service Service entity, anchored to the one-pager section. */
export function serviceSchema(service: Service) {
  const url = `${BASE}/#${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}-service`,
    name: service.name,
    serviceType: service.title,
    description: service.metaDescription,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "Country", name: siteConfig.address.country },
    ...(service.heroImage ? { image: `${BASE}${service.heroImage}` } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.title },
      })),
    },
  };
}

/** FAQPage entity built from the shared FAQ data. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Generic WebPage / ContactPage / AboutPage node. */
export function pageSchema(
  type: "WebPage" | "ContactPage" | "AboutPage",
  opts: { name: string; description: string; path: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${BASE}${opts.path === "/" ? "/#webpage" : `${opts.path}#webpage`}`,
    name: opts.name,
    description: opts.description,
    url: `${BASE}${opts.path}`,
    inLanguage: "fr-LU",
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": BUSINESS_ID },
  };
}
