import { ImageSlot } from "@/components/shared/ImageSlot";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Container } from "@/components/layout/Container";
import { BlueprintBg } from "@/components/shared/BlueprintBg";
import contentData from "@/data/content.json";

const { caseStudy, photos } = contentData;

export function CaseStudy() {
  return (
    <section className="dx-section bg-dx-navy-500 relative overflow-hidden">

      {/* Animated blueprint background */}
      <BlueprintBg variant="dark" />

      {/* Diagonal stripe accent (animated drift) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="dx-stripe dx-stripe--drift absolute"
          style={{ width: "2px", height: "500px", top: "-60px", left: "55%", opacity: 0.09 }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">

          {/* Image column */}
          <RevealOnScroll variant="left">
            <div className="relative">
              {/* Offset border decoration */}
              <div
                className="absolute -inset-3 rounded-2xl hidden lg:block"
                style={{ border: "1px solid rgba(31,104,177,0.2)" }}
                aria-hidden
              />
              <ImageSlot
                src={photos["case-study"] || "/images/case-study.jpg"}
                alt="Complexe de bureaux moderne géré par DX Facilities"
                className="w-full relative z-10"
              />
            </div>
          </RevealOnScroll>

          {/* Content column */}
          <RevealOnScroll variant="right" delay={80}>
            <div className="flex flex-col gap-7">

              {/* Eyebrow */}
              <div className="dx-eyebrow" style={{ color: "rgba(107,160,220,0.9)" }}>
                {caseStudy.eyebrow}
              </div>

              {/* Title */}
              <h2 className="dx-h2 text-white">{caseStudy.title}</h2>

              {/* Body */}
              <p className="dx-body" style={{ color: "rgba(255,255,255,0.65)" }}>
                {caseStudy.body}
              </p>

              {/* Stats row */}
              <div
                className="grid grid-cols-3 gap-4 py-5 border-y"
                style={{ borderColor: "rgba(255,255,255,0.1)" }}
              >
                {caseStudy.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span
                      className="kpi-number text-dx-blue-300 leading-tight"
                      style={{ fontSize: "28px" }}
                    >
                      {stat.value}
                    </span>
                    <span className="dx-caption" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="flex flex-col gap-2 pl-5"
                style={{ borderLeft: "2px solid #1F68B1" }}
              >
                <p
                  className="dx-body italic"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  «&#160;{caseStudy.quote}&#160;»
                </p>
                <cite
                  className="dx-caption not-italic"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {caseStudy.quoteCite}
                </cite>
              </blockquote>

            </div>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  );
}
