/**
 * Todo el contenido del portafolio, en español e inglés.
 * Fuentes: LinkedIn (experiencia y educación), README de GitHub,
 * portafolio anterior y lib/content/projects.ts de vipertech-website.
 */

export type Locale = "es" | "en";
export type L = { es: string; en: string };

export const tr = (value: L, locale: Locale) => value[locale];

export const PROFILE = {
  name: "Vincenzo Zoffoli",
  email: "vinzoffoli@gmail.com",
  photo: "/brand/vincenzo.webp",
  timezone: "America/Costa_Rica",
  socials: [
    { label: "LinkedIn", handle: "in/vinzoffoli", href: "https://www.linkedin.com/in/vinzoffoli/" },
    { label: "GitHub", handle: "VinZoffoli", href: "https://github.com/VinZoffoli" },
    { label: "Instagram", handle: "@vin_zoffoli", href: "https://www.instagram.com/vin_zoffoli" },
    { label: "ViperTech", handle: "vipertechcr.com", href: "https://vipertechcr.com/" },
  ],
} as const;

export const UI = {
  nav: [
    { id: "sobre-mi", label: { es: "Sobre mí", en: "About" } },
    { id: "experiencia", label: { es: "Experiencia", en: "Experience" } },
    { id: "proyectos", label: { es: "Proyectos", en: "Work" } },
    { id: "stack", label: { es: "Stack", en: "Stack" } },
    { id: "contacto", label: { es: "Contacto", en: "Contact" } },
  ],
  cta: { es: "Hablemos", en: "Let's talk" },
  menu: { es: "Menú", en: "Menu" },
  close: { es: "Cerrar", en: "Close" },
  skip: { es: "Saltar al contenido", en: "Skip to content" },
  loader: { es: "Cargando portafolio", en: "Loading portfolio" },
} satisfies Record<string, unknown>;

export const HERO = {
  eyebrow: { es: "Desarrollador web · Frontend UI/UX", en: "Web developer · Frontend UI/UX" },
  origin: { es: "Chileno en Guápiles, Costa Rica", en: "Chilean, based in Guápiles, Costa Rica" },
  role: { es: "Desarrollador web en Guápiles, Costa Rica", en: "Web developer in Guápiles, Costa Rica" },
  lead: {
    es: "Diseño y construyo sitios que hacen algo: reservar una mesa, vender un producto, conseguir un cliente. Código a medida cuando hace falta, builders cuando es lo correcto.",
    en: "I design and build websites that actually do something: book a table, sell a product, land a client. Custom code when it's needed, site builders when that's the right call.",
  },
  primary: { es: "Ver proyectos", en: "See my work" },
  secondary: { es: "Escríbeme", en: "Get in touch" },
  available: { es: "Disponible para proyectos", en: "Available for projects" },
  localTime: { es: "Hora local", en: "Local time" },
  scroll: { es: "Desliza", en: "Scroll" },
};

export const ABOUT = {
  eyebrow: { es: "Sobre mí", en: "About me" },
  manifesto: { es: "Manifiesto", en: "Manifesto" },
  statement: {
    // {photo} {code} {cursor} {site} {motion}: piezas visuales incrustadas en la frase
    es: "Soy {photo} psicólogo de formación y desarrollador {code} por obsesión. Entiendo cómo piensa la persona que llega a un sitio {cursor} y lo traduzco en interfaces {site} rápidas, accesibles y con movimiento {motion} que se siente, no que estorba.",
    en: "Psychologist {photo} by training, developer {code} by obsession. I understand how the person landing on a site {cursor} thinks, and I turn that into interfaces {site} that are fast, accessible, and full of motion {motion} you feel rather than fight.",
  },
  body: [
    {
      es: "Hoy trabajo en dos frentes: como desarrollador Frontend UI/UX en Resto Experience, donde mantengo más de 20 sitios de restaurantes, bares y marcas en Estados Unidos y Latinoamérica, y como cofundador de ViperTech, un estudio de dos personas en Guápiles, Costa Rica.",
      en: "Today I work on two fronts: as a Frontend UI/UX developer at Resto Experience, where I maintain 20+ sites for restaurants, bars and brands across the US and Latin America, and as co-founder of ViperTech, a two-person studio in Guápiles, Costa Rica.",
    },
    {
      es: "Elijo la plataforma por el proyecto, no por comodidad: Next.js y React cuando el sitio tiene que ser rápido y a medida; WordPress, Webflow, Wix o Framer cuando el cliente necesita editarlo cada semana sin depender de mí.",
      en: "I pick the platform for the project, not for my own comfort: Next.js and React when the site has to be fast and bespoke; WordPress, Webflow, Wix or Framer when the client needs to edit it every week without depending on me.",
    },
  ],
  madeOfTitle: { es: "De qué estoy hecho", en: "What I'm made of" },
  badge: { es: "Chileno en Costa Rica • Frontend UI/UX • ", en: "Chilean in Costa Rica • Frontend UI/UX • " },
  ingredients: [
    {
      word: { es: "Psicología", en: "Psychology" },
      text: {
        es: "Licenciado en Psicología por la Universidad Nacional de Córdoba. Diseño pensando en cómo decide, duda y confía la persona del otro lado de la pantalla.",
        en: "Psychology degree from Universidad Nacional de Córdoba. I design around how the person on the other side of the screen decides, hesitates and trusts.",
      },
    },
    {
      word: { es: "Código", en: "Code" },
      text: {
        es: "Next.js, React, TypeScript y Node cuando el proyecto pide algo rápido y a medida. WordPress, Webflow, Wix o Framer cuando el cliente necesita editarlo solo.",
        en: "Next.js, React, TypeScript and Node when a project needs to be fast and bespoke. WordPress, Webflow, Wix or Framer when the client needs to edit it alone.",
      },
    },
    {
      word: { es: "Diseño", en: "Design" },
      text: {
        es: "Figma, sistemas visuales y movimiento con GSAP y Lenis. La animación como parte de la interfaz, nunca como adorno que retrasa la carga.",
        en: "Figma, visual systems and motion with GSAP and Lenis. Animation as part of the interface, never as decoration that slows the page down.",
      },
    },
    {
      word: { es: "Oficio", en: "Craft" },
      text: {
        es: "Más de 60 sitios para negocios reales en 15 países: reservas, pedidos online, tiendas y leads, con SEO técnico y accesibilidad desde el primer commit.",
        en: "60+ sites for real businesses in 15 countries: reservations, online ordering, stores and leads, with technical SEO and accessibility from the first commit.",
      },
    },
  ],
  stats: [
    { value: 60, suffix: "+", label: { es: "Sitios entregados", en: "Sites shipped" } },
    { value: 15, suffix: "", label: { es: "Países con clientes", en: "Client countries" } },
    { value: 20, suffix: "+", label: { es: "Sitios activos en Resto", en: "Live sites at Resto" } },
    { value: 3, suffix: "+", label: { es: "Años construyendo web", en: "Years building for the web" } },
  ],
  langs: {
    es: "Español nativo · Inglés avanzado · Italiano intermedio",
    en: "Native Spanish · Advanced English · Intermediate Italian",
  },
};

export type Role = {
  title: L;
  period: L;
  bullets: L[];
};

export type Job = {
  company: string;
  logo: string | null;
  mark?: { text: string; bg: string; fg: string };
  url?: string;
  meta: L;
  current?: boolean;
  roles: Role[];
  tags: string[];
};

export const EXPERIENCE: { eyebrow: L; title: L; jobs: Job[]; earlierTitle: L; earlier: { role: L; company: string; logo: string | null; period: L; place: string }[] } = {
  eyebrow: { es: "Experiencia", en: "Experience" },
  title: { es: "Dónde he construido", en: "Where I've been building" },
  jobs: [
    {
      company: "Resto Experience",
      logo: "/logos/resto-experience.svg",
      url: "https://restoexp.com/",
      meta: { es: "Jornada completa · Remoto, Estados Unidos", en: "Full-time · Remote, United States" },
      current: true,
      tags: ["Next.js", "React", "TypeScript", "GSAP", "Lenis", "Vercel", "WordPress", "Elementor", "Webflow"],
      roles: [
        {
          title: { es: "Desarrollador Frontend UI/UX", en: "Frontend UI/UX Developer" },
          period: { es: "jun 2026 — actualidad", en: "Jun 2026 — present" },
          bullets: [
            {
              es: "Sitios a medida con Next.js, React y TypeScript en Vercel, con foco en performance, SEO técnico y Core Web Vitals.",
              en: "Custom sites in Next.js, React and TypeScript on Vercel, focused on performance, technical SEO and Core Web Vitals.",
            },
            {
              es: "Animación e interacción con GSAP, Lenis y Framer Motion: scroll narrativo, parallax y microinteracciones que no castigan la carga.",
              en: "Motion and interaction with GSAP, Lenis and Framer Motion: narrative scroll, parallax and micro-interactions that don't cost load time.",
            },
            {
              es: "Mantenimiento evolutivo de más de 20 sitios activos entre Next.js, WordPress/Elementor y Webflow.",
              en: "Ongoing evolution of 20+ live sites across Next.js, WordPress/Elementor and Webflow.",
            },
            {
              es: "Producto propio: widget de accesibilidad en JavaScript vanilla (Shadow DOM, trilingüe) pensado para el rubro gastronómico.",
              en: "In-house product: a vanilla JavaScript accessibility widget (Shadow DOM, trilingual) built for the restaurant vertical.",
            },
            {
              es: "Problemas de punta a punta: migraciones de staging a producción, dominios y DNS, reservas y pedidos online, debugging cross-browser.",
              en: "End-to-end problem solving: staging-to-production migrations, domains and DNS, reservations and online ordering, cross-browser debugging.",
            },
          ],
        },
        {
          title: { es: "Desarrollador web", en: "Web Developer" },
          period: { es: "dic 2025 — jun 2026", en: "Dec 2025 — Jun 2026" },
          bullets: [
            {
              es: "Diseño, desarrollo y maquetación de sitios gastronómicos en WordPress y Webflow.",
              en: "Design, development and build-out of restaurant websites in WordPress and Webflow.",
            },
          ],
        },
      ],
    },
    {
      company: "ViperTech CR",
      logo: "/logos/vipertech.png",
      url: "https://vipertechcr.com/",
      meta: { es: "Cofundador · Guápiles, Costa Rica · Remoto", en: "Co-founder · Guápiles, Costa Rica · Remote" },
      current: true,
      tags: ["WordPress", "WooCommerce", "Elementor", "Figma", "SEO", "Wix", "Webflow"],
      roles: [
        {
          title: { es: "Cofundador y desarrollador web", en: "Co-founder & Web Developer" },
          period: { es: "feb 2023 — actualidad", en: "Feb 2023 — present" },
          bullets: [
            {
              es: "35+ sitios corporativos, tiendas online y landing pages para empresas de Latinoamérica, Estados Unidos y Europa.",
              en: "35+ corporate sites, online stores and landing pages for companies across Latin America, the US and Europe.",
            },
            {
              es: "Diseño y prototipado en Figma, maquetación responsive y optimización de rendimiento.",
              en: "Design and prototyping in Figma, responsive build-out and performance optimization.",
            },
            {
              es: "SEO básico y técnico en cada entrega: estructura de encabezados, metadatos, sitemaps, datos estructurados y SEO local para negocios de Costa Rica.",
              en: "Basic and technical SEO in every delivery: heading structure, metadata, sitemaps, structured data and local SEO for Costa Rican businesses.",
            },
            {
              es: "Relación directa con cada cliente: del descubrimiento al lanzamiento y la capacitación para administrar su sitio.",
              en: "Direct relationship with every client: from discovery to launch and training them to run their own site.",
            },
          ],
        },
      ],
    },
    {
      company: "Workana",
      logo: "/logos/workana.png",
      url: "https://www.workana.com/",
      meta: { es: "Freelance · Remoto", en: "Freelance · Remote" },
      tags: ["WordPress", "HTML", "CSS", "JavaScript"],
      roles: [
        {
          title: { es: "Desarrollador web freelance", en: "Freelance Web Developer" },
          period: { es: "Freelance", en: "Freelance" },
          bullets: [
            {
              es: "Proyectos de desarrollo web para clientes de distintos países, gestionados de punta a punta a través de la plataforma.",
              en: "Web development projects for clients in different countries, handled end to end through the platform.",
            },
          ],
        },
      ],
    },
    {
      company: "Teclab Instituto Técnico Superior",
      logo: "/logos/teclab.png",
      meta: { es: "Contrato temporal · Córdoba, Argentina · Remoto", en: "Temporary contract · Córdoba, Argentina · Remote" },
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Firebase", "PHP"],
      roles: [
        {
          title: { es: "Desarrollador web", en: "Web Developer" },
          period: { es: "abr 2023 — dic 2023", en: "Apr 2023 — Dec 2023" },
          bullets: [
            {
              es: "Diseño y desarrollo de un e-commerce para la industria automotriz, con pasarelas de pago de Mercado Pago y PayPal.",
              en: "Designed and built an e-commerce site for the automotive industry, with Mercado Pago and PayPal payment gateways.",
            },
          ],
        },
      ],
    },
  ],
  earlierTitle: { es: "Antes del código", en: "Before code" },
  earlier: [
    { role: { es: "Operador de logística", en: "Logistics Operator" }, company: "Mercado Libre", logo: "/logos/mercadolibre.png", period: { es: "2024 — 2025", en: "2024 — 2025" }, place: "Viña del Mar, Chile" },
    { role: { es: "Supervisor de cobros", en: "Collections Supervisor" }, company: "Naranja X", logo: "/logos/naranjax.png", period: { es: "2023 — 2024", en: "2023 — 2024" }, place: "Córdoba, Argentina" },
    { role: { es: "Coordinador de logística", en: "Logistics Coordinator" }, company: "Butori Insumet", logo: null, period: { es: "2020 — 2024", en: "2020 — 2024" }, place: "Córdoba, Argentina" },
    { role: { es: "Acompañante terapéutico", en: "Therapeutic Companion" }, company: "Espacio Terapéutico El Árbol", logo: null, period: { es: "2019", en: "2019" }, place: "Córdoba, Argentina" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  url: string;
  image: string;
  mobile?: string;
  kind: L;
  place: string;
  stack: string[];
};

export const RESTO = {
  eyebrow: { es: "Resto Experience", en: "Resto Experience" },
  title: { es: "Restaurantes, bares y marcas en EE. UU.", en: "Restaurants, bars and brands in the US" },
  lead: {
    es: "Sitios donde el menú, las reservas y el pedido online tienen que funcionar un viernes a las 8 p. m. Construidos con movimiento, rendimiento y accesibilidad desde el primer commit.",
    en: "Sites where the menu, reservations and online ordering have to work on a Friday at 8 p.m. Built with motion, performance and accessibility from the first commit.",
  },
  projects: [
    { slug: "showdown", name: "Showdown Social", url: "https://www.showdown.com/", image: "/work/resto/showdown.webp", mobile: "/work/resto/showdown-m.webp", kind: { es: "Entretenimiento social", en: "Social entertainment" }, place: "Alpharetta, GA", stack: ["Next.js", "CSS scroll-driven", "Reservas"] },
    { slug: "bey", name: "Bey Mediterranean", url: "https://www.beymediterranean.com/", image: "/work/resto/bey.webp", mobile: "/work/resto/bey-m.webp", kind: { es: "Cocina mediterránea", en: "Mediterranean kitchen" }, place: "Roswell, GA", stack: ["Next.js", "Tailwind", "Video hero"] },
    { slug: "tacomadre", name: "Taco Madre", url: "https://www.tacomadremexicangrill.com/", image: "/work/resto/tacomadre.webp", mobile: "/work/resto/tacomadre-m.webp", kind: { es: "Mexican grill", en: "Mexican grill" }, place: "Georgia", stack: ["Next.js", "Tailwind", "Catering"] },
    { slug: "aldente", name: "Al Dente Pizza", url: "https://www.aldentepizzarestaurant.com/", image: "/work/resto/aldente.webp", mobile: "/work/resto/aldente-m.webp", kind: { es: "Pizzería italiana", en: "Italian pizzeria" }, place: "Duluth & Hoschton, GA", stack: ["Next.js", "Motion", "Multi-local"] },
    { slug: "unfiltered", name: "Unfiltered Beauty", url: "https://unfilteredbeautymedspa.com/", image: "/work/resto/unfiltered.webp", mobile: "/work/resto/unfiltered-m.webp", kind: { es: "Med spa", en: "Med spa" }, place: "Gainesville, GA", stack: ["Next.js", "GSAP", "Lenis", "Three.js"] },
    { slug: "moodybobby", name: "Moody Bobby", url: "https://www.moodybobby.com/", image: "/work/resto/moodybobby.webp", mobile: "/work/resto/moodybobby-m.webp", kind: { es: "E-commerce headless", en: "Headless e-commerce" }, place: "Dacula, GA", stack: ["Next.js", "Shopify", "GSAP"] },
    { slug: "smallcakes", name: "Smallcakes Gwinnett", url: "https://smallcakesgwinnett.com/", image: "/work/resto/smallcakes.webp", mobile: "/work/resto/smallcakes-m.webp", kind: { es: "Cupcakes y heladería", en: "Cupcakes & ice cream" }, place: "Gwinnett, GA", stack: ["Next.js", "Tailwind", "Pedidos online"] },
  ] satisfies Project[],
};

export const VIPER = {
  eyebrow: { es: "ViperTech CR", en: "ViperTech CR" },
  title: { es: "Empresas que crecen en Latinoamérica", en: "Businesses growing across Latin America" },
  lead: {
    es: "Sitios corporativos, tiendas online y landings para clientes en 15 países. Sin intermediarios: hablas con quien lo diseña y con quien lo construye.",
    en: "Corporate sites, online stores and landing pages for clients in 15 countries. No middlemen: you talk to the people who design and build it.",
  },
  all: { es: "Ver los 35+ proyectos", en: "See all 35+ projects" },
  allHref: "https://vipertechcr.com/proyectos",
  projects: [
    { slug: "tricad", name: "Tricad Eco Energy", url: "https://tricadecoenergy.com/", image: "/work/vipertech/tricad-eco-energy.webp", kind: { es: "Energía solar", en: "Solar energy" }, place: "Multipage · SEO", stack: [] },
    { slug: "ocho", name: "Ocho Artisan Bungalows", url: "https://ochoartisanbungalows.com/", image: "/work/vipertech/ocho-artisan-bungalows.webp", kind: { es: "Hotel boutique", en: "Boutique hotel" }, place: "Tamarindo, CR", stack: [] },
    { slug: "inmoxo", name: "Inmoxo", url: "https://inmoxo.com/", image: "/work/vipertech/inmoxo.webp", kind: { es: "Inmobiliaria", en: "Real estate" }, place: "E-commerce", stack: [] },
    { slug: "psicopro", name: "PsicoPro", url: "https://psicoprohealth.com/", image: "/work/vipertech/psicopro.webp", kind: { es: "Software de salud", en: "Health software" }, place: "Multipage", stack: [] },
    { slug: "ingeocaribe", name: "Ingeocaribe", url: "https://ingeocaribe.com.do/", image: "/work/vipertech/ingeocaribe.webp", kind: { es: "Geotecnia", en: "Geotechnics" }, place: "Rep. Dominicana", stack: [] },
    { slug: "ktzu", name: "Ktzu Natural", url: "https://ktzunatural.com/", image: "/work/vipertech/ktzu-natural.webp", kind: { es: "Tienda online", en: "Online store" }, place: "WooCommerce", stack: [] },
    { slug: "puravida", name: "Pura Vida Coast", url: "https://puravidacoast.com/", image: "/work/vipertech/pura-vida-coast.webp", kind: { es: "Turismo", en: "Tourism" }, place: "Costa Rica", stack: [] },
    { slug: "bluorganics", name: "Bluorganics", url: "https://bluorganics.es/", image: "/work/vipertech/bluorganics.webp", kind: { es: "Agricultura", en: "Agriculture" }, place: "España · E-commerce", stack: [] },
    { slug: "musa", name: "Musa Blends", url: "https://musablends.com/", image: "/work/vipertech/musa-blends.webp", kind: { es: "Suplementos", en: "Supplements" }, place: "E-commerce", stack: [] },
    { slug: "ecopower", name: "Eco Power Latam", url: "https://www.ecopowerlatam.com/", image: "/work/vipertech/eco-power-latam.webp", kind: { es: "Energía renovable", en: "Renewable energy" }, place: "Multipage", stack: [] },
    { slug: "sol", name: "Sol Estética", url: "https://sol-estetica.com/", image: "/work/vipertech/sol-estetica.webp", kind: { es: "Estética", en: "Aesthetics" }, place: "Multipage", stack: [] },
    { slug: "archlinexp", name: "Archlinexp", url: "https://archlinexp.cl/", image: "/work/vipertech/archlinexp.webp", kind: { es: "Software BIM y CAD", en: "BIM & CAD software" }, place: "Chile", stack: [] },
  ] satisfies Project[],
};

export const STACK = {
  eyebrow: { es: "Stack", en: "Stack" },
  title: { es: "Código a medida o builder: lo que el proyecto pida", en: "Custom code or a builder: whatever the project needs" },
  groups: [
    {
      name: { es: "Frontend", en: "Frontend" },
      note: { es: "Interfaces a medida, rápidas y animadas", en: "Bespoke, fast, animated interfaces" },
      items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Sass", "Bootstrap", "GSAP", "Lenis", "Framer Motion", "Three.js"],
    },
    {
      name: { es: "Plataformas y CMS", en: "Platforms & CMS" },
      note: { es: "Sitios que el cliente puede editar solo", en: "Sites clients can edit on their own" },
      items: ["WordPress", "Elementor", "WooCommerce", "Webflow", "Wix", "Framer", "Shopify", "Squarespace"],
    },
    {
      name: { es: "Backend y datos", en: "Backend & data" },
      note: { es: "APIs, bases de datos e integraciones", en: "APIs, databases and integrations" },
      items: ["Node.js", "Express", "PHP", "Python", "MySQL", "MongoDB", "SQL / Oracle", "Supabase", "Firebase", "REST APIs", "Mercado Pago", "PayPal"],
    },
    {
      name: { es: "Diseño", en: "Design" },
      note: { es: "Del wireframe al prototipo aprobado", en: "From wireframe to approved prototype" },
      items: ["Figma", "UI/UX", { es: "Prototipado", en: "Prototyping" }, "Design systems", "Responsive", "Motion design", { es: "Accesibilidad WCAG", en: "WCAG accessibility" }],
    },
    {
      name: { es: "SEO", en: "SEO" },
      note: { es: "Que te encuentren, también en tu ciudad", en: "Get found, in your own city too" },
      items: ["SEO on-page", { es: "SEO técnico", en: "Technical SEO" }, { es: "Estructura H1–H6", en: "H1–H6 structure" }, { es: "SEO local", en: "Local SEO" }, "Schema / JSON-LD", "Core Web Vitals", { es: "Sitemaps y robots", en: "Sitemaps & robots" }, { es: "Metadatos y Open Graph", en: "Metadata & Open Graph" }],
    },
    {
      name: { es: "Tools y Ops", en: "Tools & Ops" },
      note: { es: "Del repositorio al dominio en producción", en: "From repository to a live domain" },
      items: ["Git", "GitHub", "Vercel", { es: "DNS y dominios", en: "DNS & domains" }, "Hosting", "Search Console", "Tag Manager", "Google Analytics", "Cursor", "Linear"],
    },
  ],
};

export const PROCESS = {
  eyebrow: { es: "Cómo trabajo", en: "How I work" },
  title: { es: "Cinco pasos, cero sorpresas", en: "Five steps, zero surprises" },
  steps: [
    { name: { es: "Descubrimiento", en: "Discovery" }, text: { es: "Alcance por escrito antes de diseñar nada.", en: "Scope in writing before anything gets designed." } },
    { name: { es: "Diseño", en: "Design" }, text: { es: "Cada pantalla aprobada en Figma antes de programar.", en: "Every screen approved in Figma before any code." } },
    { name: { es: "Desarrollo", en: "Build" }, text: { es: "Un link de staging que puedes abrir en tu propio teléfono.", en: "A staging link you can open on your own phone." } },
    { name: { es: "Lanzamiento", en: "Launch" }, text: { es: "El dominio a tu nombre, no al mío.", en: "The domain in your name, not mine." } },
    { name: { es: "Soporte", en: "Support" }, text: { es: "Te enseño a administrar tu sitio. Un sitio al que no accedes no es un activo.", en: "I teach you to run your own site. A site you can't access isn't an asset." } },
  ],
};

export const EDUCATION = {
  eyebrow: { es: "Formación", en: "Education" },
  title: { es: "Psicología, programación y algo de idiomas", en: "Psychology, programming and a few languages" },
  items: [
    { school: "Universidad Nacional de Córdoba", logo: "/logos/unc.png", degree: { es: "Licenciatura en Psicología", en: "Bachelor's degree in Psychology" }, period: "2017 — 2024" },
    { school: "Teclab Instituto Técnico Superior", logo: "/logos/teclab.png", degree: { es: "Tecnicatura en Programación", en: "Associate degree in Programming" }, period: "2022 — 2024" },
    { school: "Coderhouse", logo: "/logos/coderhouse.png", degree: { es: "Carrera de Desarrollo Full Stack", en: "Full Stack Development program" }, period: "2023 — 2024" },
    { school: "FICDE Institución Educativa", logo: "/logos/ficde.webp", degree: { es: "Tecnicatura en Acompañamiento Terapéutico", en: "Associate degree in Therapeutic Support" }, period: "2019 — 2020" },
    { school: "Universidad Nacional de Córdoba", logo: "/logos/unc.png", degree: { es: "Inglés avanzado · Italiano intermedio", en: "Advanced English · Intermediate Italian" }, period: "2018 — 2024" },
  ],
};

export const CONTACT = {
  eyebrow: { es: "Contacto", en: "Contact" },
  title: { es: "¿Construimos algo?", en: "Shall we build something?" },
  lead: {
    es: "Cuéntame qué tiene que lograr tu sitio y te digo cómo lo construiría. Respondo en menos de 24 horas.",
    en: "Tell me what your site needs to achieve and I'll tell you how I'd build it. I reply within 24 hours.",
  },
  copy: { es: "Copiar email", en: "Copy email" },
  copied: { es: "¡Copiado!", en: "Copied!" },
  write: { es: "Enviar un email", en: "Send an email" },
  big: { es: "Hablemos", en: "Let's talk" },
  footer: {
    es: "Diseñado y desarrollado por Vincenzo Zoffoli.",
    en: "Designed and built by Vincenzo Zoffoli.",
  },
  top: { es: "Volver arriba", en: "Back to top" },
};

export const MARQUEE = [
  "Next.js", "React", "TypeScript", "GSAP", "WordPress", "Webflow", "Framer", "Wix", "Shopify", "Node.js", "Tailwind", "Figma", "MySQL", "Supabase",
];
