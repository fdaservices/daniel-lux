import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

const { iubenda, gtmId } = siteConfig.tracking;

/** Iubenda Privacy Controls and Cookie Solution — full configuration. */
const iubendaConfig = `var _iub = _iub || [];
_iub.csConfiguration = ${JSON.stringify({
  askConsentAtCookiePolicyUpdate: true,
  cookiePolicyInOtherWindow: true,
  enableTcf: true,
  floatingPreferencesButtonDisplay: "bottom-right",
  googleAdditionalConsentMode: true,
  perPurposeConsent: true,
  siteId: iubenda.siteId,
  tcfPurposes: {
    "1": false,
    "2": "consent_only",
    "3": false,
    "4": false,
    "7": false,
    "8": "consent_only",
    "9": false,
    "10": false,
    "11": "consent_only",
  },
  whitelabel: false,
  cookiePolicyId: iubenda.cookiePolicyId,
  banner: {
    acceptButtonColor: "#186DD6",
    acceptButtonDisplay: true,
    backgroundColor: "#FFFFFF",
    backgroundOverlay: true,
    closeButtonDisplay: false,
    customizeButtonColor: "#8B8989",
    customizeButtonDisplay: true,
    explicitWithdrawal: true,
    linksColor: "#042874",
    listPurposes: true,
    logo: null,
    ownerName: "daniel-lux sàrl-s",
    position: "float-bottom-center",
    rejectButtonColor: "#000000",
    rejectButtonDisplay: true,
    showPurposesToggles: true,
    showTotalNumberOfProviders: true,
    textColor: "#5B5B5B",
  },
})};
_iub.csLangConfiguration = ${JSON.stringify({
  fr: { cookiePolicyId: iubenda.cookiePolicyId },
})};`;

const gtmInit = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;

const inter = Inter({
  variable: "--font-sans-var",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const homeTitle = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Construction & rénovation",
  keywords: [
    "construction Luxembourg",
    "rénovation Luxembourg",
    "entreprise du bâtiment Luxembourg",
    "peinture Luxembourg",
    "gros œuvre Luxembourg",
    "isolation Luxembourg",
    "carrelage parquet Luxembourg",
    "faux plafonds Luxembourg",
    "démolition Luxembourg",
    "Daniel-Lux",
    "artisan bâtiment Perlé",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: homeTitle,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — construction et rénovation au Luxembourg`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1626",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${manrope.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white" suppressHydrationWarning>
        {/* GTM noscript — must be the first thing inside <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/*
          Iubenda cookie consent. The config (which only defines window._iub)
          runs beforeInteractive; the scripts that scan and mutate the DOM run
          afterInteractive so they don't alter the markup before React hydrates
          (which would cause hydration mismatches). The Google Maps iframe is
          pre-blocked manually via data-suppressedsrc + `_iub_cs_activate`
          (see page.tsx), so it stays consent-gated regardless of this timing.
        */}
        <Script id="iubenda-config" strategy="beforeInteractive">
          {iubendaConfig}
        </Script>
        <Script
          src={`https://cs.iubenda.com/autoblocking/${iubenda.siteId}.js`}
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.iubenda.com/cs/tcf/stub-v2.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.iubenda.com/cs/tcf/safe-tcf-v2.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.iubenda.com/cs/iubenda_cs.js"
          charSet="UTF-8"
          strategy="afterInteractive"
        />

        {/* Google Tag Manager — loaded after Iubenda autoblocking is in place. */}
        <Script id="gtm-init" strategy="afterInteractive">
          {gtmInit}
        </Script>

        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
