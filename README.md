# Portafolio — Vincenzo Zoffoli

Landing personal (ES en `/`, EN en `/en`). Next.js 16 (App Router, Cache Components), React 19, Tailwind v4, GSAP + ScrollTrigger y Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Dónde está cada cosa

- `lib/content.ts`: todo el texto, la experiencia, los proyectos y el stack, en español e inglés. Es el único archivo que hay que tocar para actualizar contenido.
- `components/sections/*`: una sección por archivo, cada una con sus animaciones (`useGSAP`).
- `components/motion/*`: Lenis sincronizado con el ticker de GSAP, y el sistema de reveals por atributos (`data-reveal`, `data-reveal="clip"`, `data-parallax`).
- `components/Preloader.tsx`: el contador con cortina. Se muestra una vez por sesión y nunca con `prefers-reduced-motion`.
- `public/work/*`: capturas de los proyectos. `public/logos/*`: logos de empresas e instituciones.

## SEO

- Metadatos por idioma, con canonical y hreflang: `lib/metadata.ts`.
- JSON-LD con Person, ProfessionalService (con sede en Guápiles) y WebSite: `components/StructuredData.tsx`.
- `app/sitemap.ts`, `app/robots.ts` e imágenes Open Graph por idioma (`opengraph-image.png`).
- La URL pública se configura con `NEXT_PUBLIC_SITE_URL`. Por defecto es `https://vz-portfolio.vercel.app`.
