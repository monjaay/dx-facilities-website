import { LogoWatermark } from "@/components/shared/LogoWatermark";
import { Container } from "@/components/layout/Container";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden bg-dx-navy-500 py-16 lg:py-24">
      {/* Logo watermark */}
      <LogoWatermark opacity={0.04} position="center-right" />

      {/* Diagonal stripe accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="dx-stripe absolute"
          style={{ width: "3px", height: "400px", top: "-60px", right: "30%", opacity: 0.14 }}
        />
        <div
          className="dx-stripe absolute"
          style={{ width: "2px", height: "320px", top: "-40px", right: "calc(30% + 28px)", opacity: 0.07 }}
        />
      </div>

      {/* Bottom gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-12"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(19,24,46,0.3))" }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col gap-4 max-w-2xl animate-fade-rise">
          <div className="dx-eyebrow-pill dx-eyebrow-pill--dark self-start">
            <span className="dot" aria-hidden />
            {eyebrow}
          </div>
          <h1 className="dx-h1 text-white leading-tight">{title}</h1>
          {subtitle && (
            <p className="dx-lead text-white/65 max-w-xl">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
