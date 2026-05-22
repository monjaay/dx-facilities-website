// JSON-LD structured data helpers for rich search results.
// Rendered as <script type="application/ld+json"> — invisible to users,
// read by Google, Bing, and other search engines.

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Shared constants ─────────────────────────────────────────────────────────

export const BASE_URL = "https://www.dxfacilities.com";

export const ORG_IDENTITY = {
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "DX Facilities",
  alternateName: ["DX Facilities Sénégal", "DXFacilities"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png",
    width: 600,
    height: 300,
  },
  image: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png",
  telephone: "+221338431464",
  email: "info@dxfacilities.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Route de l'Aéroport, lot N°88106, Yoff ONOMO",
    addressLocality: "Dakar",
    addressRegion: "Dakar",
    addressCountry: "SN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.7645,
    longitude: -17.366,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "13:00",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "XOF",
  areaServed: [
    { "@type": "Country", "name": "Sénégal" },
    { "@type": "City", "name": "Dakar" },
    { "@type": "AdministrativeArea", "name": "Afrique de l'Ouest" },
  ],
  knowsAbout: [
    "Facility Management",
    "Maintenance technique",
    "Gestion des actifs immobiliers",
    "Smart Buildings",
    "Efficacité énergétique",
    "Sécurité des bâtiments",
    "Nettoyage professionnel",
  ],
  sameAs: ["https://dextera-group.com"],
  parentOrganization: {
    "@type": "Organization",
    name: "DEXTERA GROUP",
    url: "https://dextera-group.com",
  },
};

// ── Schema factories ─────────────────────────────────────────────────────────

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "DX Facilities",
    url: BASE_URL,
    inLanguage: "fr-SN",
    description:
      "Facility management intégré au Sénégal — maintenance, énergie, sécurité, propreté, smart buildings.",
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    ...ORG_IDENTITY,
    description:
      "DX Facilities est le leader du facility management intégré au Sénégal. Membre de DEXTERA GROUP, nous gérons la maintenance technique, l'efficacité énergétique, la sécurité et la propreté de vos installations à Dakar et en Afrique de l'Ouest.",
  };
}

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/services/${opts.slug}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.category,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: [
      { "@type": "Country", name: "Sénégal" },
      { "@type": "City", name: "Dakar" },
    ],
    url: `${BASE_URL}/services/${opts.slug}`,
    inLanguage: "fr",
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/contact`,
      description: "Demander une évaluation gratuite",
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
