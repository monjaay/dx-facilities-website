import { kpis } from "@/data/kpis";
import { Container } from "@/components/layout/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { LogoWatermark } from "@/components/shared/LogoWatermark";

export function KPIBand() {
  return (
    <section className="relative overflow-hidden bg-dx-navy-500 py-20 lg:py-24">

      {/* Diagonal accent stripes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="dx-stripe absolute"
          style={{ width: "3px", height: "380px", top: "-60px", right: "18%", opacity: 0.14 }}
        />
        <div
          className="dx-stripe absolute"
          style={{ width: "2px", height: "300px", top: "-40px", right: "calc(18% + 26px)", opacity: 0.07 }}
        />
      </div>

      {/* Logo watermark */}
      <LogoWatermark opacity={0.035} position="center" scale={0.9} />

      {/* Subtle top cobalt line */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(to right, transparent 0%, #1F68B1 40%, transparent 100%)" }}
      />

      <Container className="relative z-10">

        {/* Section eyebrow */}
        <RevealOnScroll>
          <div className="flex justify-center mb-12">
            <span className="dx-eyebrow-pill dx-eyebrow-pill--dark">
              <span className="dot" aria-hidden />
              Performance prouvée
            </span>
          </div>
        </RevealOnScroll>

        {/* KPI grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, index) => (
            <RevealOnScroll key={kpi.label} delay={index * 80}>
              <div
                className={[
                  "flex flex-col items-center text-center px-6 py-4",
                  index < kpis.length - 1
                    ? "border-b lg:border-b-0 border-r last:border-r-0"
                    : "",
                ].join(" ")}
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Number */}
                <div
                  className="kpi-number text-white leading-none mb-2"
                  style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
                >
                  {kpi.value}
                  <span
                    className="text-dx-blue-300 ml-1.5"
                    style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}
                  >
                    {kpi.unit}
                  </span>
                </div>

                {/* Divider accent */}
                <div
                  className="w-8 h-[1px] mb-3"
                  style={{ background: "rgba(107,160,220,0.4)" }}
                  aria-hidden
                />

                {/* Label */}
                <p
                  className="text-xs font-medium uppercase tracking-[0.1em]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {kpi.label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

      </Container>
    </section>
  );
}
