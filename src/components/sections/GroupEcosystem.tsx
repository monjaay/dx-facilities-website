import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { ArrowRight, ExternalLink } from "lucide-react";

type Subsidiary = {
  name: string;
  slogan: string;
  description: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  highlighted?: boolean;
  href?: string;
  website?: string;
};

const subsidiaries: Subsidiary[] = [
  {
    name: "Dextera Construction",
    slogan: "You believe it, we make it happen!",
    description:
      "13 ans d'expertise dans le BTP : béton bas carbone, énergies renouvelables, méthodes Lean et BIM. Projets publics et privés certifiés aux normes internationales.",
    logo: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295662/LOGO_DEXTERA_CONSTRUCTION_xxzmaw.png",
    logoWidth: 400,
    logoHeight: 200,
  },
  {
    name: "Dextera Real Estate",
    slogan: "Together for inspiring and sustainable spaces.",
    description:
      "Développement de pôles économiques, logements sociaux écologiques, résidences durables et projets hôteliers éco-certifiés.",
    logo: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295780/logo_dextera_real_estate_oud7rs_27f986.png",
    logoWidth: 400,
    logoHeight: 200,
  },
  {
    name: "DX Management",
    slogan: "Building Compliance, Ensuring Sustainability.",
    description:
      "Ingénierie, certification et maîtrise d'œuvre environnementale : audits, AMO, BIM, ESG, EDGE, LEED, BREEAM, HQE, formations spécialisées.",
    logo: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295867/logo_dx_management_193f65.png",
    logoWidth: 400,
    logoHeight: 200,
  },
  {
    name: "DX Facilities",
    slogan: "Helping you to focus and optimizing your resources!",
    description:
      "Facility management intégral : maintenance technique, gestion d'actifs, smart buildings, efficacité énergétique, sécurité, propreté et accueil.",
    logo: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png",
    logoWidth: 870,
    logoHeight: 739,
    highlighted: true,
    href: "/services",
  },
  {
    name: "Opal DX",
    slogan: "Smarter than you think!",
    description:
      "Fourniture intégrée de matériaux durables, mobilier, équipements techniques et électroménagers. Chaîne d'approvisionnement optimisée.",
    logo: "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295662/LOGOS_OPAL-ok_vu74sm.png",
    logoWidth: 400,
    logoHeight: 200,
    website: "https://opaldx.com",
  },
];

export function GroupEcosystem() {
  return (
    <section className="dx-section bg-[#090d1a]">
      <Container>
        <div className="flex flex-col gap-14">
          {/* Header */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <Eyebrow>L&apos;écosystème DEXTERA</Eyebrow>
            <h2 className="dx-h2 text-white">
              Cinq filiales, une vision intégrée
            </h2>
            <p className="dx-lead text-white/65">
              DX Facilities est l&apos;une des cinq filiales du groupe DEXTERA.
              Ensemble, elles couvrent l&apos;intégralité du cycle de vie d&apos;un
              bâtiment — de la conception à l&apos;exploitation quotidienne.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {subsidiaries.map((sub) => (
              <div
                key={sub.name}
                className={[
                  "group relative flex flex-col gap-4 rounded-xl border p-6 transition-all duration-200",
                  sub.highlighted
                    ? "border-dx-blue-400/60 bg-dx-blue-500"
                    : "border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20",
                ].join(" ")}
              >
                {/* Vous êtes ici badge */}
                {sub.highlighted && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest bg-white/20 text-white px-2 py-0.5 rounded-full">
                    Vous êtes ici
                  </span>
                )}

                {/* Logo — self-start prevents flex-col card from stretching it */}
                <div className="h-10 flex items-center">
                  <Image
                    src={sub.logo}
                    alt={`Logo ${sub.name}`}
                    width={sub.logoWidth}
                    height={sub.logoHeight}
                    style={{ height: 34, width: "auto", maxWidth: "130px" }}
                    className={`self-start ${sub.highlighted ? "brightness-0 invert" : "brightness-0 invert opacity-80"}`}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className={[
                    "text-sm font-bold leading-snug uppercase tracking-wide",
                    sub.highlighted ? "text-white" : "text-white",
                  ].join(" ")}>
                    {sub.name}
                  </h3>
                  <p className={[
                    "text-[11px] italic font-medium leading-snug",
                    sub.highlighted ? "text-white/80" : "text-dx-blue-300",
                  ].join(" ")}>
                    {sub.slogan}
                  </p>
                  <p className={[
                    "text-xs leading-relaxed mt-1",
                    sub.highlighted ? "text-white/75" : "text-white/50",
                  ].join(" ")}>
                    {sub.description}
                  </p>
                </div>

                {/* CTA links */}
                <div className="flex flex-col gap-1.5 mt-1">
                  {sub.highlighted && sub.href && (
                    <Link
                      href={sub.href}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white group-hover:gap-2.5 transition-all duration-150"
                    >
                      Voir nos services <ArrowRight size={12} strokeWidth={2} />
                    </Link>
                  )}
                  {sub.website && (
                    <a
                      href={sub.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        "flex items-center gap-1.5 text-xs font-semibold transition-all duration-150",
                        sub.highlighted
                          ? "text-white/70 hover:text-white"
                          : "text-dx-blue-300 hover:text-dx-blue-200",
                      ].join(" ")}
                    >
                      <ExternalLink size={11} strokeWidth={2} />
                      {sub.website.replace("https://", "")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
