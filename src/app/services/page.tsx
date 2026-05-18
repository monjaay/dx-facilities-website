import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { CTABand } from "@/components/sections/CTABand";
import { ImageSlot } from "@/components/shared/ImageSlot";

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

export default function ServicesPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>Nos services</Eyebrow>
            <h1 className="dx-h1 text-white">
              Une offre complète pour chaque enjeu de vos installations
            </h1>
            <p className="dx-lead text-white/70 max-w-xl">
              Cinq domaines d'expertise, huit services opérationnels : DX Facilities
              couvre l'intégralité du cycle de vie de vos bâtiments, de la
              maintenance préventive à la gestion intelligente des actifs.
            </p>
          </div>
        </Container>
      </section>

      {categories.map((category) => {
        const categoryServices = services.filter(
          (s) => s.category === category
        );
        if (categoryServices.length === 0) return null;
        return (
          <section key={category} className="dx-section bg-dx-paper border-t border-dx-steel-100 first:border-0">
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

      <section className="dx-section bg-white border-t border-dx-steel-100">
        <Container>
          <ImageSlot
            src="/images/services-overview.jpg"
            alt="Ingénieur DX Facilities avec tablette de supervision"
            aspectRatio="aspect-[16/6]"
            className="w-full"
          />
        </Container>
      </section>

      <CTABand />
    </>
  );
}
