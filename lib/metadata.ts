import type { Metadata, Viewport } from "next";
import type { Locale } from "./content";
import { SITE_URL } from "./site";

const TITLE = {
  es: "Vincenzo Zoffoli | Desarrollador web en Guápiles, Costa Rica",
  en: "Vincenzo Zoffoli | Web developer in Guápiles, Costa Rica",
};

const DESC = {
  es: "Desarrollador web chileno en Guápiles, Costa Rica. Sitios a medida con Next.js y React, y también WordPress, Webflow, Wix y Framer, con SEO técnico y local. Frontend UI/UX en Resto Experience y cofundador de ViperTech.",
  en: "Chilean web developer based in Guápiles, Costa Rica. Custom sites in Next.js and React, plus WordPress, Webflow, Wix and Framer, with technical and local SEO. Frontend UI/UX at Resto Experience and co-founder of ViperTech.",
};

const KEYWORDS = {
  es: ["desarrollador web Guápiles", "diseño web Guápiles", "desarrollador web Costa Rica", "diseño de páginas web Limón", "desarrollador Next.js", "desarrollador WordPress Costa Rica", "Webflow", "SEO local Costa Rica", "Vincenzo Zoffoli"],
  en: ["web developer Costa Rica", "web developer Guápiles", "Next.js developer", "React developer", "WordPress developer", "Webflow developer", "frontend UI/UX developer", "Vincenzo Zoffoli"],
};

export function buildMetadata(locale: Locale): Metadata {
  const path = locale === "es" ? "/" : "/en";
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE[locale],
    description: DESC[locale],
    keywords: KEYWORDS[locale],
    authors: [{ name: "Vincenzo Zoffoli", url: SITE_URL }],
    creator: "Vincenzo Zoffoli",
    alternates: {
      canonical: path,
      languages: { "es-CR": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: TITLE[locale],
      description: DESC[locale],
      url: path,
      siteName: "Vincenzo Zoffoli",
      type: "profile",
      locale: locale === "es" ? "es_CR" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CR"],
    },
    twitter: { card: "summary_large_image", title: TITLE[locale], description: DESC[locale] },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    other: {
      "geo.region": "CR-L",
      "geo.placename": "Guápiles",
      "geo.position": "10.2154;-83.7844",
      ICBM: "10.2154, -83.7844",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#2b0a12",
  colorScheme: "light",
};
