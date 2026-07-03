import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { LogoWatermark } from "@/components/shared/LogoWatermark";
import contentData from "@/data/content.json";

const { ctaBand } = contentData;

export function CTABand() {
  return (
    <section className="relative bg-dx-blue-500 py-20 lg:py-24 overflow-hidden">

      {/* Diagonal texture stripes (animated drift) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="dx-stripe dx-stripe--drift absolute"
          style={{ width: "3px", height: "500px", top: "-80px", right: "24%", opacity: 0.14 }}
        />
        <div
          className="dx-stripe dx-stripe--drift absolute"
          style={{ width: "2px", height: "400px", top: "-60px", right: "calc(24% + 30px)", opacity: 0.08, animationDelay: "-6s" }}
        />
      </div>

      {/* Radial pulse rings — emanate from right side near CTA buttons */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ right: "8%", top: "50%", transform: "translateY(-50%)" }}
      >
        <div className="ctaband-ring" />
        <div className="ctaband-ring" />
        <div className="ctaband-ring" />
      </div>

      {/* Logo watermark */}
      <LogoWatermark opacity={0.06} position="bottom-right" scale={0.8} />

      {/* Fine dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top + bottom edge lines */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16">

          {/* Copy */}
          <RevealOnScroll variant="left" className="flex-1">
            <div className="flex flex-col gap-3 max-w-[600px]">
              <h2
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
              >
                {ctaBand.title}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {ctaBand.subtitle}
              </p>
            </div>
          </RevealOnScroll>

          {/* Buttons */}
          <RevealOnScroll variant="right" delay={80}>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="btn btn--inverse btn--lg flex items-center gap-2"
              >
                {ctaBand.ctaPrimary}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link
                href="/services"
                className="btn btn--lg"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                }}
              >
                {ctaBand.ctaSecondary}
              </Link>
            </div>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  );
}
