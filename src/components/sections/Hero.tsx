import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { LogoWatermark } from "@/components/shared/LogoWatermark";
import contentData from "@/data/content.json";

const { hero, photos, kpis } = contentData;

// Trust indicators shown beneath the CTAs
const trustItems = [
  { icon: CheckCircle, text: "Évaluation gratuite sous 24 h" },
  { icon: CheckCircle, text: "Sans engagement initial" },
  { icon: Clock, text: "Support 24/7" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dx-navy-500" style={{ minHeight: "88vh" }}>

      {/* Background dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(31,104,177,0.1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Diagonal brand stripes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="dx-stripe absolute"
          style={{ width: "3px", height: "600px", top: "-80px", right: "36%", opacity: 0.18 }}
        />
        <div
          className="dx-stripe absolute"
          style={{ width: "2px", height: "500px", top: "-60px", right: "calc(36% + 30px)", opacity: 0.10 }}
        />
        <div
          className="dx-stripe absolute"
          style={{ width: "4px", height: "400px", top: "-40px", right: "calc(36% - 26px)", opacity: 0.07 }}
        />
      </div>

      {/* Radial glow behind image area */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(31,104,177,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Logo watermark */}
      <LogoWatermark opacity={0.04} position="center-right" scale={1.1} />

      <div className="dx-container relative z-10 flex flex-col justify-center py-20 lg:py-28"
        style={{ minHeight: "inherit" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow pill */}
            <div className="animate-fade-rise">
              <span className="dx-eyebrow-pill dx-eyebrow-pill--dark">
                <span className="dot" aria-hidden />
                {hero.eyebrow}
              </span>
            </div>

            {/* Display headline */}
            <div className="animate-fade-rise anim-delay-75">
              <h1
                className="dx-display text-white leading-none"
                style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
              >
                {hero.title}{" "}
                <span className="text-dx-blue-300">{hero.titleAccent}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-white/70 leading-relaxed max-w-[520px] animate-fade-rise anim-delay-150"
              style={{ fontSize: "18px" }}
            >
              {hero.subtitle}
            </p>

            {/* Tagline */}
            <p className="text-dx-blue-300/80 text-sm italic font-medium animate-fade-rise anim-delay-225">
              {hero.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1 animate-fade-rise anim-delay-300">
              <Link href="/contact" className="btn btn--primary btn--lg flex items-center gap-2">
                {hero.ctaPrimary}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link href="/services" className="btn btn--lg"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "white",
                  backdropFilter: "blur(4px)",
                }}
              >
                {hero.ctaSecondary}
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 animate-fade-rise anim-delay-400">
              {trustItems.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-xs text-white/50">
                  <Icon size={12} strokeWidth={2} className="text-dx-blue-400 shrink-0" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="hidden lg:flex flex-col gap-4 animate-fade-left anim-delay-150">

            {/* Image or abstract panel */}
            {photos.hero ? (
              <ImageSlot
                src={photos.hero}
                alt="Technicien DX Facilities en intervention sur site"
                aspectRatio="aspect-[4/5]"
                className="w-full max-w-md mx-auto"
                priority
              />
            ) : (
              /* Abstract panel when no hero photo */
              <div className="relative w-full max-w-[420px] mx-auto">
                {/* KPI grid card */}
                <div
                  className="rounded-2xl p-8 border"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
                      Indicateurs clés
                    </p>
                    <span
                      className="flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1"
                      style={{ background: "rgba(30,142,85,0.15)", color: "#4ade80" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" aria-hidden />
                      Opérationnel
                    </span>
                  </div>

                  {/* KPI grid */}
                  <div className="grid grid-cols-2 gap-px"
                    style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px", overflow: "hidden" }}>
                    {kpis.map((kpi, i) => (
                      <div
                        key={kpi.label}
                        className="flex flex-col gap-1 p-5"
                        style={{ background: "#13182E" }}
                      >
                        <div className="font-display font-bold text-white leading-none"
                          style={{ fontSize: "32px" }}>
                          {kpi.value}
                          <span className="text-dx-blue-300 ml-1" style={{ fontSize: "18px" }}>
                            {kpi.unit}
                          </span>
                        </div>
                        <p className="text-white/45 text-xs mt-1 leading-tight">{kpi.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom footer */}
                  <div className="mt-6 pt-5 border-t flex items-center justify-between"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                    <p className="text-white/35 text-xs">Membre de</p>
                    <p className="text-white/70 text-xs font-semibold tracking-wider uppercase">
                      DEXTERA GROUP
                    </p>
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  className="absolute -bottom-5 -right-5 rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #1F68B1, #155291)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-lg leading-none font-display">8</span>
                    <span className="text-white/70 text-xs mt-0.5">services</span>
                  </div>
                  <div className="w-px h-8 bg-white/20" />
                  <p className="text-white/80 text-xs leading-tight max-w-[100px]">
                    domaines d'expertise intégrés
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(19,24,46,0.4))",
        }}
      />
    </section>
  );
}
