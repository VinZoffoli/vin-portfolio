/**
 * URL pública del sitio. Se define en Vercel con NEXT_PUBLIC_SITE_URL
 * cuando haya dominio propio; mientras tanto apunta al proyecto actual.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vz-portfolio.vercel.app").replace(/\/$/, "");

/** Guápiles, Pococí, Limón — coordenadas aproximadas del centro. */
export const GEO = { lat: 10.2154, lng: -83.7844 };
