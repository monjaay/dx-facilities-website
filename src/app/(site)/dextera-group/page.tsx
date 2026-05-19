import type { Metadata } from "next";
import { GroupEcosystem } from "@/components/sections/GroupEcosystem";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ImageSlot } from "@/components/shared/ImageSlot";

export const metadata: Metadata = {
  title: "DEXTERA GROUP — Écosystème multisectoriel",
  description:
    "Découvrez DEXTERA GROUP, groupe fondé en 2024 par El Hadji Malick Gueye, et ses 5 filiales spécialisées dans la construction, l'immobilier et le facility management.",
};

const timeline = [
  {
    year: "2024",
    event:
      "Fondation de DEXTERA GROUP par El Hadji Malick Gueye, avec la vision d'un écosystème multisectoriel complémentaire couvrant l'intégralité du cycle de vie d'un bâtiment.",
  },
  {
    year: "2024",
    event:
      "Lancement de DX Facilities pour répondre à la demande croissante de facility management structuré et technologique au Sénégal.",
  },
  {
    year: "2025",
    event:
      "Déploiement des premiers contrats multitechniques et lancement du programme de monitoring énergétique pour les clients grands comptes.",
  },
];

export default function DexteraGroupPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>DEXTERA GROUP</Eyebrow>
            <h1 className="dx-h1 text-white">
              Building Legacies. Managing Impact.
            </h1>
            <p className="dx-lead text-white/70">
              DEXTERA GROUP est un écosystème de cinq filiales complémentaires
              couvrant l'intégralité du cycle de vie d'un bâtiment, de la
              construction à la gestion opérationnelle quotidienne.
            </p>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="flex flex-col gap-6">
              <Eyebrow>Notre histoire</Eyebrow>
              <h2 className="dx-h2 text-white">
                Un groupe fondé sur une vision à long terme
              </h2>
              <p className="dx-body text-white/70">
                DEXTERA GROUP a été fondé en 2024 par El Hadji Malick Gueye,
                ingénieur en génie civil et expert en management QHSE avec plus
                de 15 ans d'expérience sur les plus grands projets
                d'infrastructure du Sénégal.
              </p>
              <p className="dx-body text-white/70">
                La vision : créer un groupe multisectoriel dont les filiales se
                renforcent mutuellement pour offrir à leurs clients une
                couverture complète, de la conception à l'exploitation de leurs
                actifs immobiliers.
              </p>
            </div>

            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center gap-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dx-blue-500 text-white">
                      <span className="font-mono text-[10px] font-bold">{i + 1}</span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-white/15 mt-1" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 pt-0.5 pb-2">
                    <span className="dx-eyebrow">{item.year}</span>
                    <p className="dx-body text-white/70">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-dx-navy-500 border-t border-white/10">
        <Container>
          <ImageSlot
            src="/images/dextera-group.jpg"
            alt="Immeuble de bureaux moderne, siège DEXTERA GROUP Dakar"
            aspectRatio="aspect-[16/7]"
            className="w-full"
          />
        </Container>
      </section>

      <GroupEcosystem />
      <CTABand />
    </>
  );
}
