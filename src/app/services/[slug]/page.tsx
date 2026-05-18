import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services, serviceBySlug } from "@/data/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import { CTABand } from "@/components/sections/CTABand";
import { ImageSlot } from "@/components/shared/ImageSlot";

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

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro,
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon];
  const otherServices = services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Hero section */}
      <section className="bg-dx-navy-500 py-16 lg:py-20">
        <Container>
          <div className="flex flex-col gap-6 max-w-2xl">
            <Link
              href="/services"
              className="dx-caption text-white/50 hover:text-white/80 transition-colors duration-120 flex items-center gap-1.5 w-fit"
            >
              ← Tous les services
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-dx-blue-500 text-white">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <Eyebrow>{service.category}</Eyebrow>
            </div>
            <h1 className="dx-h1 text-white">{service.title}</h1>
            <p className="font-display text-xl font-bold text-dx-blue-300 leading-snug">
              {service.tagline}
            </p>
            <p className="dx-lead text-white/70">{service.intro}</p>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="dx-section bg-dx-paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Left column */}
            <div className="flex flex-col gap-12">

              {/* Service image — swap by placing a file at /images/services/{slug}.jpg */}
              <ImageSlot
                src={`/images/services/${service.slug}.jpg`}
                alt={`${service.title} — DX Facilities`}
                aspectRatio="aspect-[16/7]"
                className="w-full"
              />

              {/* Details paragraph */}
              <div className="flex flex-col gap-4">
                <h2 className="dx-h3 text-dx-navy-500">Notre engagement</h2>
                <p className="dx-body text-dx-steel-600 leading-relaxed">
                  {service.details}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-6">
                <h2 className="dx-h3 text-dx-navy-500">
                  Ce que nous faisons pour vous
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        strokeWidth={1.75}
                        className="shrink-0 mt-0.5 text-dx-blue-500"
                      />
                      <span className="dx-body text-dx-navy-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div className="flex flex-col gap-6">
                <h2 className="dx-h3 text-dx-navy-500">Notre approche</h2>
                <div className="flex flex-col gap-0">
                  {service.process.map((item, i) => (
                    <div key={i} className="flex gap-5 pb-8 last:pb-0">
                      <div className="flex flex-col items-center gap-0">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-dx-blue-500 text-white">
                          <span className="font-mono text-[10px] font-bold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {i < service.process.length - 1 && (
                          <div className="w-px flex-1 bg-dx-steel-200 mt-1" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5 pt-0.5 pb-2">
                        <h3 className="font-sans text-base font-semibold text-dx-navy-500">
                          {item.step}
                        </h3>
                        <p className="dx-body text-dx-steel-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 self-start">
              <div className="rounded-xl bg-dx-navy-500 p-6 flex flex-col gap-6">
                <h3 className="dx-caption font-semibold uppercase tracking-eyebrow text-white/60">
                  Indicateurs clés
                </h3>
                <div className="flex flex-col gap-4">
                  {service.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex flex-col gap-0.5 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <span className="font-mono text-xl font-bold text-dx-blue-300 tabular-nums">
                        {kpi.value}
                      </span>
                      <span className="dx-caption text-white/60">
                        {kpi.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="btn btn--primary btn--lg w-full justify-center mt-2"
                >
                  Demander une évaluation
                </Link>
                <Link
                  href="/contact"
                  className="btn btn--inverse btn--lg w-full justify-center"
                >
                  Nous contacter
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Other services */}
      <section className="dx-section bg-white border-t border-dx-steel-100">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3 max-w-xl">
              <Eyebrow>Nos autres services</Eyebrow>
              <h2 className="dx-h2 text-dx-navy-500">
                Une offre intégrée pour vos installations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherServices.map((s) => {
                const OtherIcon = iconMap[s.icon];
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex flex-col gap-3 rounded-lg border border-dx-steel-100 bg-dx-paper p-5 transition-all duration-180 hover:border-dx-steel-300 hover:shadow-md hover:border-t-2 hover:border-t-dx-blue-500"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dx-navy-500 text-white">
                      <OtherIcon size={18} strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-sans text-sm font-semibold text-dx-navy-500 leading-snug">
                        {s.title}
                      </h3>
                      <p className="dx-caption text-dx-steel-500 leading-relaxed line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                    <span className="mt-auto flex items-center gap-1 dx-caption font-semibold text-dx-blue-500 group-hover:gap-2 transition-all duration-120">
                      Découvrir
                      <ArrowRight size={13} strokeWidth={2} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
