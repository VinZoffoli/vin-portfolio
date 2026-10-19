import { PROFILE, STACK, type Locale } from "@/lib/content";
import { SITE_URL, GEO } from "@/lib/site";

/**
 * JSON-LD para SEO local: una Persona (Vincenzo) y un servicio
 * profesional de desarrollo web con sede en Guápiles, Costa Rica.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const url = locale === "es" ? `${SITE_URL}/` : `${SITE_URL}/en`;
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Guápiles",
    addressRegion: "Limón",
    addressCountry: "CR",
  };
  const knowsAbout = STACK.groups.flatMap((g) => g.items.map((i) => (typeof i === "string" ? i : i[locale])));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        url,
        image: `${SITE_URL}${PROFILE.photo}`,
        email: `mailto:${PROFILE.email}`,
        jobTitle: locale === "es" ? "Desarrollador web Frontend UI/UX" : "Frontend UI/UX Web Developer",
        nationality: { "@type": "Country", name: "Chile" },
        homeLocation: { "@type": "Place", address },
        address,
        worksFor: [
          { "@type": "Organization", name: "Resto Experience", url: "https://restoexp.com/" },
          { "@type": "Organization", name: "ViperTech CR", url: "https://vipertechcr.com/" },
        ],
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Universidad Nacional de Córdoba" },
          { "@type": "EducationalOrganization", name: "Teclab Instituto Técnico Superior" },
          { "@type": "EducationalOrganization", name: "Coderhouse" },
        ],
        knowsLanguage: ["es", "en", "it"],
        knowsAbout,
        sameAs: PROFILE.socials.map((s) => s.href),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: locale === "es" ? "Vincenzo Zoffoli — Desarrollo web en Guápiles" : "Vincenzo Zoffoli — Web development in Guápiles",
        description:
          locale === "es"
            ? "Diseño y desarrollo de sitios web, tiendas online y landing pages en Guápiles, Costa Rica: Next.js, React, WordPress, Webflow, Wix y Framer, con SEO técnico y local."
            : "Website, online store and landing page design and development in Guápiles, Costa Rica: Next.js, React, WordPress, Webflow, Wix and Framer, with technical and local SEO.",
        url,
        image: `${SITE_URL}${PROFILE.photo}`,
        email: PROFILE.email,
        founder: { "@id": `${SITE_URL}/#person` },
        address,
        geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
        areaServed: [
          { "@type": "City", name: "Guápiles" },
          { "@type": "AdministrativeArea", name: "Limón" },
          { "@type": "Country", name: "Costa Rica" },
          { "@type": "Place", name: "Latinoamérica" },
          { "@type": "Country", name: "United States" },
        ],
        serviceType: ["Desarrollo web", "Diseño web", "SEO técnico", "SEO local", "E-commerce", "Landing pages"],
        availableLanguage: ["Spanish", "English"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: PROFILE.name,
        inLanguage: locale === "es" ? "es-CR" : "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
