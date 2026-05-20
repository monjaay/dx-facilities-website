import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GroupEcosystem } from "@/components/sections/GroupEcosystem";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { Globe, Layers, Leaf, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "DEXTERA GROUP — Building Legacies, Managing Impact",
  description:
    "Groupe panafricain pluridisciplinaire spécialisé dans le développement immobilier, la construction, la gestion d'actifs, les certifications environnementales et les services à haute valeur ajoutée.",
};

const GROUP_LOGO =
  "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295663/LOGO_DEXTERA_GROUP_rczxng.png";

const pillars = [
  {
    icon: Globe,
    title: "Ancrage panafricain",
    body: "Basé en Afrique de l'Ouest, DEXTERA agit à l'échelle régionale pour bâtir des infrastructures durables et accessibles.",
  },
  {
    icon: Layers,
    title: "Approche intégrée",
    body: "De la conception à l'exploitation, les cinq filiales couvrent l'intégralité de la chaîne de valeur du cadre de vie.",
  },
  {
    icon: Leaf,
    title: "Impact environnemental",
    body: "Innovation, qualité et responsabilité environnementale et sociale au cœur de chaque projet du groupe.",
  },
  {
    icon: Award,
    title: "Excellence certifiée",
    body: "Standards internationaux — LEED, BREEAM, HQE, EDGE, ISO — appliqués à travers toutes les filiales.",
  },
];

const timeline = [
  {
    year: "2024",
    title: "Fondation du groupe",
    event:
      "El Hadji Malick Gueye fonde DEXTERA GROUP avec la vision d'un écosystème multisectoriel couvrant l'intégralité du cycle de vie d'un bâtiment.",
  },
  {
    year: "2024",
    title: "Lancement de DX Facilities",
    event:
      "Création de DX Facilities pour répondre à la demande croissante de facility management structuré et technologique au Sénégal.",
  },
  {
    year: "2025",
    title: "Déploiement opérationnel",
    event:
      "Premiers contrats multitechniques signés, lancement du programme de monitoring énergétique pour les clients grands comptes.",
  },
  {
    year: "2025+",
    title: "Expansion régionale",
    event:
      "Déploiement progressif des filiales en Afrique de l'Ouest, avec un focus sur les marchés du Sénégal, de la Côte d'Ivoire et du Mali.",
  },
];

export default function DexteraGroupPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-dx-navy-500 py-20 lg:py-28">
        {/* Diagonal decorations */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute bg-dx-blue-500/20"
            style={{
              width: "3px",
              height: "600px",
              top: "-100px",
              right: "22%",
              transform: "rotate(-50deg)",
              transformOrigin: "top center",
            }}
          />
          <div
            className="absolute bg-dx-blue-500/10"
            style={{
              width: "2px",
              height: "500px",
              top: "-80px",
              right: "calc(22% + 32px)",
              transform: "rotate(-50deg)",
              transformOrigin: "top center",
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col gap-8 max-w-3xl">
            {/* Group logo */}
            <div className="flex items-center gap-4">
              <Image
                src={GROUP_LOGO}
                alt="DEXTERA GROUP"
                width={600}
                height={300}
                style={{ height: 56, width: "auto" }}
                className="brightness-0 invert opacity-95"
                priority
              />
            </div>

            <div className="flex flex-col gap-5">
              <Eyebrow>Groupe panafricain pluridisciplinaire</Eyebrow>
              <h1 className="dx-h1 text-white leading-tight">
                Building Legacies,{" "}
                <span className="text-dx-blue-300">Managing Impact.</span>
              </h1>
              <p className="dx-lead text-white/70 max-w-2xl">
                DEXTERA GROUP est un groupe panafricain pluridisciplinaire
                spécialisé dans le développement immobilier, la construction,
                la gestion d&apos;actifs, les certifications environnementales
                et les services à haute valeur ajoutée.
              </p>
              <p className="dx-body text-white/60 max-w-2xl">
                Ancré en Afrique de l&apos;Ouest, DEXTERA agit pour bâtir des
                infrastructures durables, intelligentes et accessibles, en
                plaçant l&apos;innovation, la qualité et l&apos;impact
                environnemental et social au cœur de ses projets.
              </p>
            </div>

            <Link href="/contact" className="btn btn--primary btn--lg self-start">
              Nous contacter
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Pillars ── */}
      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-xl">
              <Eyebrow>Notre vision</Eyebrow>
              <h2 className="dx-h2 text-white">
                Un groupe fondé sur l&apos;impact durable
              </h2>
              <p className="dx-body text-white/60">
                Le groupe réunit plusieurs filiales complémentaires pour offrir
                une approche intégrée de la chaîne de valeur du cadre de vie —
                de la conception à l&apos;exploitation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dx-blue-500/15 text-dx-blue-300">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                        {p.title}
                      </h3>
                      <p className="text-sm text-white/55 leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Photo ── */}
      <section className="bg-dx-navy-500 border-y border-white/[0.06]">
        <Container className="py-0">
          <ImageSlot
            src="/images/dextera-group.jpg"
            alt="Immeuble de bureaux moderne, projets DEXTERA GROUP en Afrique de l'Ouest"
            aspectRatio="aspect-[21/8]"
            className="w-full rounded-none"
          />
        </Container>
      </section>

      {/* ── Histoire & Timeline ── */}
      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
            {/* Left: text */}
            <div className="flex flex-col gap-6">
              <Eyebrow>Notre histoire</Eyebrow>
              <h2 className="dx-h2 text-white">
                Une vision à long terme pour l&apos;Afrique
              </h2>
              <p className="dx-body text-white/65 leading-relaxed">
                DEXTERA GROUP a été fondé par El Hadji Malick Gueye, ingénieur
                en génie civil et expert en management QHSE avec plus de 15 ans
                d&apos;expérience sur les plus grands projets
                d&apos;infrastructure du Sénégal — P2i Diamniadio, Tour des
                Mamelles, Hôtel Azalaï Dakar, TER Dakar-AIBD.
              </p>
              <p className="dx-body text-white/65 leading-relaxed">
                La vision : créer un groupe multisectoriel dont les filiales se
                renforcent mutuellement pour offrir à leurs clients une
                couverture complète, de la conception à l&apos;exploitation de
                leurs actifs immobiliers.
              </p>

              {/* Group logo in text column */}
              <div className="mt-2 pt-6 border-t border-white/10">
                <Image
                  src={GROUP_LOGO}
                  alt="DEXTERA GROUP"
                  width={600}
                  height={300}
                  style={{ height: 40, width: "auto" }}
                  className="brightness-0 invert opacity-60"
                />
              </div>
            </div>

            {/* Right: timeline */}
            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dx-blue-500 text-white">
                      <span className="font-mono text-[10px] font-bold">
                        {i + 1}
                      </span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-dx-blue-500/30 to-transparent mt-1" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 pt-1 pb-4">
                    <span className="dx-eyebrow text-dx-blue-300">{item.year}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      {item.title}
                    </h3>
                    <p className="dx-body text-white/60 leading-relaxed">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Subsidiaries ecosystem ── */}
      <GroupEcosystem />

      <CTABand />
    </>
  );
}
