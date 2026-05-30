import type { Metadata } from "next";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Container } from "@/components/layout/Container";
import { CTABand } from "@/components/sections/CTABand";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import contentData from "@/data/content.json";

export const metadata: Metadata = {
  title: "Nos 8 services de Facility Management au Sénégal",
  description:
    "DX Facilities propose 8 services intégrés à Dakar : maintenance technique, gestion d'actifs, smart buildings, maintenance prédictive, efficacité énergétique, sécurité, propreté, accueil. Un seul prestataire pour tout vos bâtiments.",
  alternates: { canonical: "https://www.dxfacilities.com/services" },
  keywords: [
    "services facility management Sénégal",
    "maintenance technique Dakar",
    "gestion actifs immobiliers Sénégal",
    "smart building Dakar",
    "sécurité bâtiment Sénégal",
    "nettoyage professionnel Dakar",
    "efficacité énergétique Sénégal",
  ],
  openGraph: {
    url: "https://www.dxfacilities.com/services",
    title: "Nos 8 services de Facility Management au Sénégal — DX Facilities",
    description:
      "8 services intégrés pour vos bâtiments à Dakar : maintenance, énergie, sécurité, propreté, smart buildings.",
  },
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
      {/* Page hero */}
      <section className="bg-dx-navy-500 relative overflow-hidden py-20 lg:py-24">
        {/* Diagonal stripes */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="dx-stripe absolute"
            style={{ width: "3px", height: "400px", top: "-60px", right: "20%", opacity: 0.16 }} />
          <div className="dx-stripe absolute"
            style={{ width: "2px", height: "320px", top: "-40px", right: "calc(20% + 28px)", opacity: 0.08 }} />
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col gap-5 max-w-2xl animate-fade-rise">
            <span className="dx-eyebrow-pill dx-eyebrow-pill--dark">
              <span className="dot" aria-hidden />
              {servicesPage.hero.eyebrow}
            </span>
            <h1 className="dx-h1 text-white">{servicesPage.hero.title}</h1>
            <p className="dx-lead" style={{ color: "rgba(255,255,255,0.65)" }}>
              {servicesPage.hero.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Service categories */}
      {categories.map((category) => {
        const categoryServices = services.filter((s) => s.category === category);
        if (categoryServices.length === 0) return null;
        return (
          <section
            key={category}
            className="dx-section bg-dx-navy-500 border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <Container>
              <div className="flex flex-col gap-8">
                <RevealOnScroll>
                  <div className="dx-eyebrow" style={{ color: "rgba(107,160,220,0.8)" }}>
                    {category}
                  </div>
                </RevealOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {categoryServices.map((service, i) => (
                    <RevealOnScroll key={service.slug} delay={i * 60}>
                      <ServiceCard service={service} variant="dark" />
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Results band */}
      <section className="dx-section bg-dx-blue-500 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <Container className="relative z-10">
          <div className="flex flex-col gap-10">
            <RevealOnScroll>
              <div className="flex flex-col gap-3 max-w-xl">
                <div className="dx-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {servicesPage.results.eyebrow}
                </div>
                <h2 className="dx-h2 text-white">{servicesPage.results.title}</h2>
              </div>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {servicesPage.results.items.map((result, i) => (
                <RevealOnScroll key={result.label} delay={i * 80}>
                  <div
                    className="flex flex-col gap-2 rounded-xl p-7 border"
                    style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <span className="kpi-number text-white leading-tight" style={{ fontSize: "48px" }}>
                      {result.value}
                    </span>
                    <span className="dx-body" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {result.label}
                    </span>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
