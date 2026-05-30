import { CheckCircle, BarChart2, Lightbulb, Headphones, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import contentData from "@/data/content.json";

const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  BarChart2,
  Lightbulb,
  Headphones,
};

const { whyUs } = contentData;

// Numeric prefix labels for each pillar
const numerals = ["01", "02", "03", "04"];

export function WhyUs() {
  return (
    <section
      className="dx-section relative overflow-hidden"
      style={{ backgroundColor: "#080c18" }}
    >
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(31,104,177,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative z-10">
        <div className="flex flex-col gap-16">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto">
            <RevealOnScroll>
              <div
                className="dx-eyebrow justify-center mb-4"
                style={{ color: "rgba(107,160,220,0.9)" }}
              >
                {whyUs.eyebrow}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <h2 className="dx-h2 text-white">
                {whyUs.title}{" "}
                <span className="text-dx-blue-300">{whyUs.titleAccent}</span>
                {whyUs.titleSuffix}
              </h2>
            </RevealOnScroll>
          </div>

          {/* Pillar grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
            {whyUs.reasons.map((reason, index) => {
              const Icon = iconMap[reason.icon] ?? CheckCircle;
              return (
                <RevealOnScroll key={reason.title} delay={index * 75}>
                  <div
                    className="flex flex-col gap-6 p-8 h-full"
                    style={{ backgroundColor: "#080c18" }}
                  >
                    {/* Number + icon row */}
                    <div className="flex items-start justify-between">
                      <span
                        className="font-display font-bold leading-none select-none"
                        style={{ fontSize: "42px", color: "rgba(31,104,177,0.25)" }}
                        aria-hidden
                      >
                        {numerals[index]}
                      </span>
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{
                          background: "rgba(31,104,177,0.12)",
                          border: "1px solid rgba(31,104,177,0.2)",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.75} className="text-dx-blue-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-semibold text-white leading-snug">
                        {reason.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {reason.description}
                      </p>
                    </div>

                    {/* Bottom cobalt accent */}
                    <div
                      className="mt-auto h-[1px] w-8"
                      style={{ background: "rgba(31,104,177,0.5)" }}
                      aria-hidden
                    />
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
