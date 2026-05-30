import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CTABand } from "@/components/sections/CTABand";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/layout/Container";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import contentData from "@/data/content.json";

export const metadata: Metadata = {
  title: "À propos de DX Facilities — Expertise Facility Management Dakar",
  description:
    "15+ ans d'expertise en facility management au Sénégal. DX Facilities, membre de DEXTERA GROUP, gère vos installations à Dakar avec rigueur et innovation. Découvrez notre mission, nos valeurs et notre équipe.",
  alternates: { canonical: "https://www.dxfacilities.com/a-propos" },
  keywords: [
    "DX Facilities à propos",
    "entreprise facility management Sénégal",
    "expert maintenance Dakar",
    "DEXTERA GROUP Sénégal",
    "équipe facility management Dakar",
  ],
  openGraph: {
    url: "https://www.dxfacilities.com/a-propos",
    title: "À propos de DX Facilities — Experts en Facility Management à Dakar",
    description:
      "15+ ans d'expertise, membre de DEXTERA GROUP. L'équipe qui transforme vos installations au Sénégal.",
  },
};

const { aboutPage, photos } = contentData;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutPage.hero.eyebrow}
        title={aboutPage.hero.title}
        subtitle={aboutPage.hero.subtitle}
      />

      {/* Mission section */}
      <section className="dx-section" style={{ backgroundColor: "#080c18" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            <RevealOnScroll variant="left">
              <div className="flex flex-col gap-6">
                <div className="dx-eyebrow" style={{ color: "rgba(107,160,220,0.9)" }}>
                  {aboutPage.mission.eyebrow}
                </div>
                <h2 className="dx-h2 text-white">{aboutPage.mission.title}</h2>
                <p className="dx-body" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {aboutPage.mission.body1}
                </p>
                <p className="dx-body" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {aboutPage.mission.body2}
                </p>
              </div>
            </RevealOnScroll>

            {/* Impact stats */}
            <RevealOnScroll variant="right" delay={80}>
              <div className="grid grid-cols-2 gap-4">
                {aboutPage.impacts.map((impact, i) => (
                  <div
                    key={impact.label}
                    className="flex flex-col gap-2 rounded-xl p-6 border"
                    style={{
                      background: i % 2 === 0
                        ? "rgba(31,104,177,0.12)"
                        : "rgba(255,255,255,0.04)",
                      borderColor: i % 2 === 0
                        ? "rgba(31,104,177,0.25)"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span
                      className="kpi-number text-white leading-tight"
                      style={{ fontSize: "44px" }}
                    >
                      {impact.value}
                    </span>
                    <span className="dx-caption" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {impact.label}
                    </span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

          </div>
        </Container>
      </section>

      {/* Values section */}
      <section
        className="dx-section bg-dx-navy-500 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <Container>
          <div className="flex flex-col gap-12">

            <div className="flex flex-col gap-4 max-w-xl">
              <RevealOnScroll>
                <div className="dx-eyebrow" style={{ color: "rgba(107,160,220,0.9)" }}>
                  {aboutPage.values.eyebrow}
                </div>
              </RevealOnScroll>
              <RevealOnScroll delay={60}>
                <h2 className="dx-h2 text-white">{aboutPage.values.title}</h2>
              </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aboutPage.values.items.map((value, i) => (
                <RevealOnScroll key={value.title} delay={i * 70}>
                  <div
                    className="flex flex-col gap-3 rounded-xl p-6 border"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderColor: "rgba(255,255,255,0.09)",
                      borderTop: "2px solid #1F68B1",
                    }}
                  >
                    <h3 className="dx-h4 text-white">{value.title}</h3>
                    <p className="dx-body" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {value.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Team photo */}
            <RevealOnScroll delay={100}>
              <ImageSlot
                src={photos["about-team"] || "/images/about-team.jpg"}
                alt="Équipe DX Facilities en réunion opérationnelle"
                aspectRatio="aspect-[16/7]"
                className="w-full mt-4"
              />
            </RevealOnScroll>

          </div>
        </Container>
      </section>

      <TeamGrid />
      <CTABand />
    </>
  );
}
