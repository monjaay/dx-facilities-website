"use client";

import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { HeroCanvas } from "@/components/shared/HeroCanvas";
import { TypeWriter } from "@/components/ui/TypeWriter";
import { ShineBorder } from "@/components/ui/ShineBorder";
import { LogoWatermark } from "@/components/shared/LogoWatermark";
import contentData from "@/data/content.json";

const { hero } = contentData;

// Typewriter rotates through services — shows expertise breadth
const expertiseList = [
  "la Maintenance Technique",
  "l'Efficacité Énergétique",
  "la Sécurité des bâtiments",
  "les Smart Buildings",
  "la Gestion d'Actifs",
  "la Propreté Professionnelle",
  "le Facility Management intégré",
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-dx-navy-500"
      style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}
    >
      {/* Canvas mouse-trail layer */}
      <HeroCanvas />

      {/* Logo watermark */}
      <LogoWatermark opacity={0.035} position="center-right" scale={1.1} />

      {/* Diagonal brand stripes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dx-stripe absolute"
          style={{ width: "3px", height: "600px", top: "-80px", right: "36%", opacity: 0.16 }} />
        <div className="dx-stripe absolute"
          style={{ width: "2px", height: "500px", top: "-60px", right: "calc(36% + 30px)", opacity: 0.09 }} />
      </div>

      {/* Grid texture */}
      <div aria-hidden className="hero-grid-bg" />

      {/* Top gradient scrim (from nav) */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to bottom, rgba(19,24,46,0.6), transparent)" }}
      />

      {/* Bottom gradient scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-20"
        style={{ background: "linear-gradient(to top, rgba(19,24,46,0.5), transparent)" }}
      />

      {/* ── Main content — centered ── */}
      <div className="dx-container relative z-10 py-24 lg:py-32 w-full">
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

          {/* Availability badge */}
          <div className="animate-fade-rise flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="ping-dot" aria-hidden />
            <span style={{ color: "#22c55e" }}>Disponible</span>
            <span className="mx-1 opacity-40">·</span>
            {hero.eyebrow}
          </div>

          {/* Title box with Plus-corner markers */}
          <div
            className="hero-title-box w-full animate-fade-rise anim-delay-75"
          >
            {/* Corner markers */}
            <span aria-hidden className="corner corner-tl">
              <Plus size={20} strokeWidth={3.5} />
            </span>
            <span aria-hidden className="corner corner-tr">
              <Plus size={20} strokeWidth={3.5} />
            </span>
            <span aria-hidden className="corner corner-bl">
              <Plus size={20} strokeWidth={3.5} />
            </span>
            <span aria-hidden className="corner corner-br">
              <Plus size={20} strokeWidth={3.5} />
            </span>

            {/* H1 */}
            <h1
              className="font-display font-bold text-white leading-none"
              style={{ fontSize: "clamp(38px, 5.5vw, 72px)" }}
            >
              {hero.title}{" "}
              <span className="text-dx-blue-300">{hero.titleAccent}</span>
            </h1>
          </div>

          {/* Typewriter services line */}
          <div className="animate-fade-rise anim-delay-150 flex items-center gap-2">
            <p className="text-white/55 text-lg">
              Experts en{" "}
              <TypeWriter
                strings={expertiseList}
                className="font-semibold text-dx-blue-300"
              />
            </p>
          </div>

          {/* Subtitle */}
          <p
            className="animate-fade-rise anim-delay-225 max-w-lg leading-relaxed"
            style={{ fontSize: "17px", color: "rgba(255,255,255,0.62)" }}
          >
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="animate-fade-rise anim-delay-300 flex flex-col sm:flex-row items-center gap-3 pt-1">
            {/* Primary — ShineBorder glow */}
            <ShineBorder>
              <Link
                href="/contact"
                className="btn btn--primary btn--lg flex items-center gap-2 px-7"
              >
                {hero.ctaPrimary}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </ShineBorder>

            {/* Secondary — ghost style */}
            <Link
              href="/services"
              className="btn btn--lg"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(4px)",
              }}
            >
              {hero.ctaSecondary}
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="animate-fade-rise anim-delay-400 flex flex-wrap justify-center items-center gap-6 pt-4"
            style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px" }}
          >
            <span>Évaluation gratuite sous 24 h</span>
            <span aria-hidden style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>Sans engagement initial</span>
            <span aria-hidden style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
            <span>Support opérationnel 24/7</span>
          </div>

        </div>
      </div>
    </section>
  );
}
