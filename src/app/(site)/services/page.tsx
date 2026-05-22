import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { CTABand } from "@/components/sections/CTABand";
import contentData from "@/data/content.json";

export const metadata: Metadata = {
  title: "Nos services — Facility Management Intégré",
  description:
    "Découvrez les 8 services de facility management proposés par DX Facilities : maintenance technique, gestion du patrimoine, smart buildings, sécurité et plus encore.",
};

const categories = [
  "Infrastructure & Technique",
  "Intelligence & Technologie",
  "Énergie & Environnement",
  "Sécurité & Conformité",
  "Propreté & Services",
] as const;

const { servicesPage } = contentData;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>{servicesPage.hero.eyebrow}</Eyebrow>
            <h1 className="dx-h1 text-white">{servicesPage.hero.title}</h1>
            <p className="dx-lead text-white/70 max-w-xl">{servicesPage.hero.subtitle}</p>
          </div>
        </Container>
      </section>

      {categories.map((category, idx) => {
        const categoryServices = services.filter((s) => s.category === category);
        if (categoryServices.length === 0) return null;
        const bg = idx % 2 === 0 ? "bg-[#090d1a]" : "bg-dx-navy-500";
        return (
          <section key={category} className={`dx-section ${bg} border-t border-white/10`}>
            <Container>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <Eyebrow>{category}</Eyebrow>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                  {categoryServices.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="dx-section bg-dx-blue-500">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-xl">
              <Eyebrow>{servicesPage.results.eyebrow}</Eyebrow>
              <h2 className="dx-h2 text-white">{servicesPage.results.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesPage.results.items.map((result) => (
                <div
                  key={result.label}
                  className="flex flex-col gap-2 rounded-lg bg-white/10 p-6 border border-white/15"
                >
                  <span className="font-display font-bold text-5xl text-white leading-tight">
                    {result.value}
                  </span>
                  <span className="dx-body text-white/75">{result.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
