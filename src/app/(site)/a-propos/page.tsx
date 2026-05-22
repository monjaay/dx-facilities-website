import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ImageSlot } from "@/components/shared/ImageSlot";
import contentData from "@/data/content.json";

export const metadata: Metadata = {
  title: "À propos — Notre mission et notre équipe",
  description:
    "DX Facilities : 15+ ans d'expertise en facility management intégré au Sénégal. Découvrez notre mission, nos valeurs et notre équipe de direction.",
};

const { aboutPage } = contentData;

export default function AboutPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>{aboutPage.hero.eyebrow}</Eyebrow>
            <h1 className="dx-h1 text-white">{aboutPage.hero.title}</h1>
            <p className="dx-lead text-white/70">{aboutPage.hero.subtitle}</p>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <Eyebrow>{aboutPage.mission.eyebrow}</Eyebrow>
              <h2 className="dx-h2 text-white">{aboutPage.mission.title}</h2>
              <p className="dx-body text-white/70">{aboutPage.mission.body1}</p>
              <p className="dx-body text-white/70">{aboutPage.mission.body2}</p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {aboutPage.impacts.map((impact) => (
                <div
                  key={impact.label}
                  className="flex flex-col gap-1.5 rounded-lg bg-dx-blue-500 p-6"
                >
                  <span className="font-display font-bold text-5xl text-white leading-tight">
                    {impact.value}
                  </span>
                  <span className="dx-caption text-white/75">{impact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-dx-navy-500 border-t border-white/10">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 max-w-xl">
              <Eyebrow>{aboutPage.values.eyebrow}</Eyebrow>
              <h2 className="dx-h2 text-white">{aboutPage.values.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aboutPage.values.items.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 border-t-2 border-t-dx-blue-500 bg-white/[0.05] p-6"
                >
                  <h3 className="dx-h4 text-white">{value.title}</h3>
                  <p className="dx-body text-white/70">{value.description}</p>
                </div>
              ))}
            </div>

            <ImageSlot
              src="/images/about-team.jpg"
              alt="Équipe DX Facilities en réunion opérationnelle"
              aspectRatio="aspect-[16/7]"
              className="w-full mt-4"
            />
          </div>
        </Container>
      </section>

      <TeamGrid />
      <CTABand />
    </>
  );
}
