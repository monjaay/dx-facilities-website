import Link from "next/link";
import {
  Wrench,
  BarChart3,
  Cpu,
  Activity,
  Zap,
  Shield,
  Sparkles,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Container } from "@/components/layout/Container";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  BarChart3,
  Cpu,
  Activity,
  Zap,
  Shield,
  Sparkles,
  Users,
};

const ORDINALS = ["01", "02", "03", "04", "05", "06", "07", "08"];

export function ServicesGrid() {
  return (
    <section className="dx-section services-grid-dark relative overflow-hidden">
      {/* Ambient radial glow top-center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(31,104,177,0.07) 0%, transparent 70%)",
        }}
      />

      <Container>
        <div className="relative flex flex-col gap-16">

          {/* Section header */}
          <div className="flex flex-col gap-5 max-w-2xl">
            <RevealOnScroll>
              <span className="dx-eyebrow-pill dx-eyebrow-pill--dark self-start">
                <span className="dot" aria-hidden />
                Nos services
              </span>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <h2 className="dx-h2 text-white">
                Une offre complète de{" "}
                <span className="text-dx-blue-300">facility management</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <p className="dx-lead" style={{ color: "rgba(255,255,255,0.58)" }}>
                Huit domaines d&apos;expertise intégrés pour gérer
                l&apos;intégralité de vos installations, de la maintenance
                technique à la propreté des espaces.
              </p>
            </RevealOnScroll>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.05] rounded-xl overflow-hidden">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Wrench;
              return (
                <RevealOnScroll
                  key={service.slug}
                  delay={i * 55}
                  threshold={0.04}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="service-numbered-card group relative flex flex-col gap-5 p-7 min-h-[260px] overflow-hidden"
                  >
                    {/* Ghost ordinal */}
                    <span
                      aria-hidden
                      className="service-card-ordinal absolute top-4 right-5 select-none pointer-events-none font-bold leading-none"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {ORDINALS[i]}
                    </span>

                    {/* Top cobalt bar — slides in on hover */}
                    <span
                      aria-hidden
                      className="service-card-topbar absolute top-0 left-0 right-0 h-[2px]"
                    />

                    {/* Category eyebrow */}
                    <p
                      className="dx-eyebrow relative z-10"
                      style={{ color: "rgba(109,162,220,0.8)" }}
                    >
                      {service.category}
                    </p>

                    {/* Icon */}
                    <div
                      className="service-card-icon relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2 flex-1 relative z-10">
                      <h3 className="service-card-title text-base font-semibold leading-snug text-white">
                        {service.title}
                      </h3>
                      <p className="service-card-desc text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* CTA — slides up on hover */}
                    <span className="service-card-cta relative z-10 flex items-center gap-1.5 text-xs font-semibold text-dx-blue-400">
                      Découvrir
                      <ArrowRight size={12} strokeWidth={2.5} />
                    </span>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <RevealOnScroll delay={220}>
            <div className="flex justify-center">
              <Link
                href="/services"
                className="btn btn--ghost btn--lg"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
              >
                Voir tous nos services
              </Link>
            </div>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  );
}
