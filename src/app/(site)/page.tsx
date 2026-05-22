import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { KPIBand } from "@/components/sections/KPIBand";
import { WhyUs } from "@/components/sections/WhyUs";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "DX Facilities — Facility Management Intégré au Sénégal | Dakar",
  description:
    "N°1 du facility management intégré au Sénégal. DX Facilities gère la maintenance technique, l'énergie, la sécurité et la propreté de vos installations à Dakar. Évaluation gratuite sous 24 h.",
  alternates: { canonical: "https://www.dxfacilities.com" },
  keywords: [
    "facility management Sénégal",
    "facility management Dakar",
    "prestataire maintenance Dakar",
    "gestion installations Sénégal",
    "maintenance bâtiment Dakar",
    "services généraux Dakar",
  ],
  openGraph: {
    url: "https://www.dxfacilities.com",
    title: "DX Facilities — Facility Management Intégré au Sénégal",
    description:
      "N°1 du facility management à Dakar : maintenance, énergie, sécurité, propreté. Évaluation gratuite sous 24 h.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <KPIBand />
      <WhyUs />
      <CaseStudy />
      <CTABand />
    </>
  );
}
