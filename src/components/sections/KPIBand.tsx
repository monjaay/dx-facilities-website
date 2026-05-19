import { kpis } from "@/data/kpis";
import { DiagonalStripe } from "@/components/shared/DiagonalStripe";
import { Container } from "@/components/layout/Container";

export function KPIBand() {
  return (
    <section className="relative overflow-hidden bg-dx-navy-500 py-16 lg:py-20">
      <DiagonalStripe
        stripes={[
          { width: "3px", height: "400px", top: "-80px", right: "15%", opacity: 0.15 },
          { width: "2px", height: "350px", top: "-60px", right: "calc(15% + 24px)", opacity: 0.08 },
        ]}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {kpis.map((kpi, index) => (
            <div
              key={kpi.label}
              className={`flex flex-col gap-1 text-center lg:text-left${index < kpis.length - 1 ? " lg:border-r lg:border-white/10 lg:pr-10" : ""}`}
            >
              <div className="font-display font-bold text-6xl lg:text-7xl text-white leading-none tabular-nums">
                {kpi.value}
                <span className="text-3xl text-dx-blue-300 ml-1">{kpi.unit}</span>
              </div>
              <p className="text-sm text-white/50 mt-2 uppercase tracking-wider">{kpi.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
