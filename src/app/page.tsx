import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { KPIBand } from "@/components/sections/KPIBand";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { CTABand } from "@/components/sections/CTABand";

export const metadata: Metadata = {
  title: "DX Facilities — Facility Management Intégré au Sénégal",
  description:
    "Pilotez vos infrastructures et concentrez-vous sur votre métier. DX Facilities prend en charge la gestion intégrale de vos installations — maintenance, énergie, sécurité, propreté.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <KPIBand />
      <CaseStudy />
      <CTABand />
    </>
  );
}
