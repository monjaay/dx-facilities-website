import type { Metadata } from "next";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ImageSlot } from "@/components/shared/ImageSlot";

export const metadata: Metadata = {
  title: "À propos — Notre mission et notre équipe",
  description:
    "DX Facilities : 15+ ans d'expertise en facility management intégré au Sénégal. Découvrez notre mission, nos valeurs et notre équipe de direction.",
};

const values = [
  {
    title: "Excellence opérationnelle",
    description:
      "Chaque intervention est planifiée, tracée et évaluée. Nous nous engageons sur des indicateurs de performance concrets et mesurables.",
  },
  {
    title: "Innovation continue",
    description:
      "Nous intégrons les meilleures technologies disponibles : IoT, BMS et analytique prédictive, pour rester à la pointe du facility management.",
  },
  {
    title: "Responsabilité",
    description:
      "Conformité HSE, engagement environnemental, respect des normes internationales. Nous gérons vos installations comme si c'étaient les nôtres.",
  },
];

const impacts = [
  { value: "- 22 %", label: "de coûts opérationnels en moyenne" },
  { value: "+ 15 %", label: "de satisfaction des occupants" },
  { value: "- 40 %", label: "de temps d'arrêt non planifiés" },
  { value: "100 %", label: "de conformité réglementaire" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>À propos</Eyebrow>
            <h1 className="dx-h1 text-white">
              Nous gérons vos installations pour que vous puissiez faire votre
              métier
            </h1>
            <p className="dx-lead text-white/70">
              DX Facilities est une filiale de DEXTERA GROUP fondée pour
              apporter une réponse intégrée, technologique et humaine aux
              défis du facility management en Afrique de l'Ouest.
            </p>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <Eyebrow>Notre mission</Eyebrow>
              <h2 className="dx-h2 text-white">
                Libérer votre potentiel opérationnel
              </h2>
              <p className="dx-body text-white/70">
                Chaque heure que vos équipes consacrent à gérer la maintenance,
                la sécurité ou la propreté est une heure de moins sur votre
                cœur de métier. DX Facilities prend en charge l'intégralité de
                vos installations pour que vous vous concentriez sur
                l'essentiel.
              </p>
              <p className="dx-body text-white/70">
                Nous opérons avec des processus rigoureux, des outils digitaux
                avancés et des équipes formées aux normes internationales, pour
                un service fiable, transparent et mesurable.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {impacts.map((impact) => (
                <div
                  key={impact.label}
                  className="flex flex-col gap-1.5 rounded-lg bg-dx-blue-500 p-6"
                >
                  <span className="font-display font-bold text-5xl text-white leading-tight">
                    {impact.value}
                  </span>
                  <span className="dx-caption text-white/75">
                    {impact.label}
                  </span>
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
              <Eyebrow>Nos valeurs</Eyebrow>
              <h2 className="dx-h2 text-white">
                Ce qui guide chacune de nos interventions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 border-t-2 border-t-dx-blue-500 bg-white/[0.05] p-6"
                >
                  <h3 className="dx-h4 text-white">{value.title}</h3>
                  <p className="dx-body text-white/70">
                    {value.description}
                  </p>
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
