import type { Metadata } from "next";
import "./globals.css";
import { JsonLd, buildOrganizationSchema, buildWebSiteSchema } from "@/components/seo/JsonLd";
import { CustomCursor } from "@/components/ui/CustomCursor";

const BASE_URL = "https://www.dxfacilities.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "DX Facilities — Facility Management Intégré au Sénégal",
    template: "%s | DX Facilities Sénégal",
  },

  description:
    "DX Facilities, leader du facility management intégré au Sénégal. Maintenance technique, gestion d'actifs, smart buildings, sécurité, efficacité énergétique et propreté à Dakar et en Afrique de l'Ouest.",

  keywords: [
    "facility management Sénégal",
    "facility management Dakar",
    "gestion installations Dakar",
    "maintenance technique Sénégal",
    "maintenance bâtiments Dakar",
    "prestataire facility management Afrique de l'Ouest",
    "gestion patrimoine immobilier Sénégal",
    "smart building Dakar",
    "efficacité énergétique Sénégal",
    "sécurité bâtiment Dakar",
    "nettoyage professionnel Dakar",
    "maintenance préventive Sénégal",
    "facility manager Dakar",
    "DX Facilities",
    "DEXTERA GROUP",
    "gestion services généraux Dakar",
    "facilities management Senegal",
  ],

  authors: [{ name: "DX Facilities", url: BASE_URL }],
  creator: "DX Facilities",
  publisher: "DX Facilities",

  alternates: {
    canonical: BASE_URL,
    languages: { "fr-SN": BASE_URL },
  },

  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: "DX Facilities",
    url: BASE_URL,
    title: "DX Facilities — Facility Management Intégré au Sénégal",
    description:
      "Leader du facility management à Dakar : maintenance, énergie, sécurité, propreté, smart buildings. Membre de DEXTERA GROUP.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DX Facilities — Facility Management Intégré au Sénégal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DX Facilities — Facility Management Intégré au Sénégal",
    description:
      "Leader du facility management à Dakar : maintenance, énergie, sécurité, propreté, smart buildings.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    // Add Google Search Console and Bing Webmaster codes here when available
    // google: "your-google-verification-code",
    // other: { "msvalidate.01": "your-bing-verification-code" },
  },

  category: "Facility Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <head>
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebSiteSchema()} />
      </head>
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
