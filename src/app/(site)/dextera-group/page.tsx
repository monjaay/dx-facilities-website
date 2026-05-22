import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GroupEcosystem } from "@/components/sections/GroupEcosystem";
import { CTABand } from "@/components/sections/CTABand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { Globe, Layers, Leaf, Award, ExternalLink, type LucideIcon } from "lucide-react";
import contentData from "@/data/content.json";

export const metadata: Metadata = {
  title: "DEXTERA GROUP — Building Legacies, Managing Impact",
  description:
    "Groupe panafricain pluridisciplinaire spécialisé dans le développement immobilier, la construction, la gestion d'actifs, les certifications environnementales et les services à haute valeur ajoutée.",
};

const GROUP_LOGO =
  "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295663/LOGO_DEXTERA_GROUP_rczxng.png";

const pillarIconMap: Record<string, LucideIcon> = { Globe, Layers, Leaf, Award };

const { groupPage, photos } = contentData;

export default function DexteraGroupPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-dx-navy-500 py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute bg-dx-blue-500/20"
            style={{ width: "3px", height: "600px", top: "-100px", right: "22%", transform: "rotate(-50deg)", transformOrigin: "top center" }}
          />
          <div
            className="absolute bg-dx-blue-500/10"
            style={{ width: "2px", height: "500px", top: "-80px", right: "calc(22% + 32px)", transform: "rotate(-50deg)", transformOrigin: "top center" }}
          />
        </div>

        <Container className="relative z-10">
          <div className="flex flex-col gap-8 max-w-3xl">
            <div className="flex items-center gap-4">
              <Image
                src={GROUP_LOGO}
                alt="DEXTERA GROUP"
                width={600}
                height={300}
                style={{ height: 56, width: "auto" }}
                className="self-start brightness-0 invert opacity-95"
                priority
              />
            </div>

            <div className="flex flex-col gap-5">
              <Eyebrow>{groupPage.hero.eyebrow}</Eyebrow>
              <h1 className="dx-h1 text-white leading-tight">
                {groupPage.hero.title}{" "}
                <span className="text-dx-blue-300">{groupPage.hero.titleAccent}</span>
              </h1>
              <p className="dx-lead text-white/70 max-w-2xl">{groupPage.hero.subtitle}</p>
              <p className="dx-body text-white/60 max-w-2xl">{groupPage.hero.body}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Nous contacter
              </Link>
              <a
                href="https://dextera-group.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--lg border border-white/25 bg-transparent text-white/80 hover:text-white hover:border-white/50 flex items-center gap-2"
              >
                <ExternalLink size={15} strokeWidth={1.75} />
                dextera-group.com
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Pillars ── */}
      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-xl">
              <Eyebrow>{groupPage.vision.eyebrow}</Eyebrow>
              <h2 className="dx-h2 text-white">{groupPage.vision.title}</h2>
              <p className="dx-body text-white/60">{groupPage.vision.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {groupPage.vision.pillars.map((p) => {
                const Icon = pillarIconMap[p.icon] ?? Globe;
                return (
                  <div
                    key={p.title}
                    className="flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dx-blue-500/15 text-dx-blue-300">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">{p.title}</h3>
                      <p className="text-sm text-white/55 leading-relaxed">{p.body}</p>
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
            src={photos["dextera-group"] || "/images/dextera-group.jpg"}
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
            <div className="flex flex-col gap-6">
              <Eyebrow>{groupPage.history.eyebrow}</Eyebrow>
              <h2 className="dx-h2 text-white">{groupPage.history.title}</h2>
              <p className="dx-body text-white/65 leading-relaxed">{groupPage.history.body1}</p>
              <p className="dx-body text-white/65 leading-relaxed">{groupPage.history.body2}</p>

              <div className="mt-2 pt-6 border-t border-white/10">
                <Image
                  src={GROUP_LOGO}
                  alt="DEXTERA GROUP"
                  width={600}
                  height={300}
                  style={{ height: 40, width: "auto" }}
                  className="self-start brightness-0 invert opacity-60"
                />
              </div>
            </div>

            <div className="flex flex-col gap-0">
              {groupPage.history.timeline.map((item, i) => (
                <div key={i} className="flex gap-5 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-dx-blue-500 text-white">
                      <span className="font-mono text-[10px] font-bold">{i + 1}</span>
                    </div>
                    {i < groupPage.history.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-dx-blue-500/30 to-transparent mt-1" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 pt-1 pb-4">
                    <span className="dx-eyebrow text-dx-blue-300">{item.year}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{item.title}</h3>
                    <p className="dx-body text-white/60 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GroupEcosystem />
      <CTABand />
    </>
  );
}
