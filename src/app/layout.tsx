import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "DX Facilities — Facility Management Intégré au Sénégal",
    template: "%s | DX Facilities",
  },
  description:
    "DX Facilities est votre partenaire stratégique pour la gestion intégrale de vos installations au Sénégal et en Afrique de l'Ouest — maintenance, énergie, sécurité, propreté.",
  keywords: [
    "facility management",
    "maintenance technique",
    "smart buildings",
    "gestion actifs",
    "sécurité",
    "Sénégal",
    "Dakar",
    "DEXTERA GROUP",
  ],
  authors: [{ name: "DX Facilities" }],
  creator: "DX Facilities",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: "DX Facilities",
    title: "DX Facilities — Facility Management Intégré au Sénégal",
    description:
      "Gestion intégrale de vos installations — maintenance, énergie, sécurité, propreté.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DX Facilities — Facility Management Intégré",
    description:
      "Gestion intégrale de vos installations — maintenance, énergie, sécurité, propreté.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
