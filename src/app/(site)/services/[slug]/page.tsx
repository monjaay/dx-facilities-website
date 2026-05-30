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
  ArrowLeft,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services, serviceBySlug } from "@/data/services";
import { Container } from "@/components/layout/Container";
import { CTABand } from "@/components/sections/CTABand";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { JsonLd, buildServiceSchema, buildBreadcrumbSchema, BASE_URL } from "@/components/seo/JsonLd";

const iconMap: Record<string, LucideIcon> = {
  Wrench, BarChart3, Cpu, Activity, Zap, Shield, Sparkles, Users,
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Infrastructure & Technique": [
    "maintenance technique Dakar", "maintenance bâtiment Sénégal",
    "entretien installations Dakar", "prestataire maintenance technique Sénégal",
  ],
  "Intelligence & Technologie": [
    "smart building Dakar", "bâtiment connecté Sénégal",
    "IoT facility management Dakar", "gestion intelligente bâtiment Sénégal",
  ],
  "Énergie & Environnement": [
    "efficacité énergétique Sénégal", "audit énergétique Dakar",
    "réduction consommation énergie Sénégal", "performance énergétique bâtiment Dakar",
  ],
  "Sécurité & Conformité": [
    "sécurité bâtiment Dakar", "contrôle accès Sénégal",
    "vidéosurveillance Dakar", "conformité HSE Sénégal",
  ],
  "Propreté & Services": [
    "nettoyage professionnel Dakar", "entretien locaux Sénégal",
    "services généraux Dakar", "propreté entreprise Sénégal",
  ],
};

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};

  const catKeywords = CATEGORY_KEYWORDS[service.category] ?? [];
  const pageUrl = `${BASE_URL}/services/${slug}`;

  return {
    title: `${service.title} au Sénégal — DX Facilities Dakar`,
    description:
      `${service.tagline} DX Facilities assure ${service.title.toLowerCase()} à Dakar et dans tout le Sénégal. ${service.description} Demandez votre évaluation gratuite.`,
    alternates: { canonical: pageUrl },
    keywords: [
      `${service.title} Sénégal`,
      `${service.title} Dakar`,
      `${service.category} Dakar`,
      "facility management Sénégal",
      "DX Facilities",
      ...catKeywords,
    ],
    openGraph: {
      url: pageUrl,
      title: `${service.title} à Dakar — DX Facilities Sénégal`,
      description: `${service.tagline} ${service.description}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Wrench;
  const otherServices = services.filter((s) => s.slug !== slug);

  const serviceSchema = buildServiceSchema({
    name: service.title,
    description: service.intro,
    slug: service.slug,
    category: service.category,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Accueil", url: BASE_URL },
    { name: "Nos services", url: `${BASE_URL}/services` },
    { name: service.title, url: `${BASE_URL}/services/${slug}` },
  ]);

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Page hero */}
      <section className="bg-dx-navy-500 relative overflow-hidden py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="dx-stripe absolute"
            style={{ width: "3px", height: "400px", top: "-60px", right: "20%", opacity: 0.14 }} />
          <div className="dx-stripe absolute"
            style={{ width: "2px", height: "320px", top: "-40px", right: "calc(20% + 28px)", opacity: 0.07 }} />
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col gap-6 max-w-2xl animate-fade-rise">
            {/* Breadcrumb */}
            <Link
              href="/services"
              className="flex items-center gap-1.5 text-sm font-medium w-fit transition-colors duration-120"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Tous les services
            </Link>

            {/* Category pill */}
            <div className="flex items-center gap-3">
              <span className="dx-eyebrow-pill dx-eyebrow-pill--dark">
                <span className="dot" aria-hidden />
                {service.category}
              </span>
            </div>

            {/* Icon + title */}
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dx-blue-500 text-white">
                <Icon size={28} strokeWidth={1.75} />
              </div>
              <h1 className="dx-h1 text-white">{service.title}</h1>
            </div>

            {/* Tagline */}
            <p className="font-display text-xl font-bold text-dx-blue-300 leading-snug">
              {service.tagline}
            </p>

            {/* Intro */}
            <p className="dx-lead" style={{ color: "rgba(255,255,255,0.65)" }}>
              {service.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="dx-section" style={{ backgroundColor: "#080c18" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-16">

            {/* Left column */}
            <div className="flex flex-col gap-12">

              {/* Service image */}
              <RevealOnScroll>
                <ImageSlot
                  src={`/images/services/${service.slug}.jpg`}
                  alt={`${service.title} — DX Facilities Sénégal`}
                  aspectRatio="aspect-[16/7]"
                  className="w-full"
                />
              </RevealOnScroll>

              {/* Details */}
              <RevealOnScroll delay={60}>
                <div className="flex flex-col gap-4">
                  <h2 className="dx-h3 text-white">Notre engagement</h2>
                  <p className="dx-body leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {service.details}
                  </p>
                </div>
              </RevealOnScroll>

              {/* Features */}
              <RevealOnScroll delay={80}>
                <div className="flex flex-col gap-6">
                  <h2 className="dx-h3 text-white">Ce que nous faisons pour vous</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2
                          size={16}
                          strokeWidth={2}
                          className="shrink-0 mt-0.5 text-dx-blue-400"
                        />
                        <span className="dx-body" style={{ color: "rgba(255,255,255,0.78)" }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>

              {/* Process */}
              <RevealOnScroll delay={100}>
                <div className="flex flex-col gap-6">
                  <h2 className="dx-h3 text-white">Notre approche</h2>
                  <div className="flex flex-col">
                    {service.process.map((item, i) => (
                      <div key={i} className="flex gap-5 pb-8 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ background: "#1F68B1" }}
                          >
                            <span className="font-mono text-[10px] font-bold">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          {i < service.process.length - 1 && (
                            <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.1)" }} />
                          )}
                        </div>
                        <div className="flex flex-col gap-1.5 pt-0.5 pb-2">
                          <h3 className="font-sans text-base font-semibold text-white">
                            {item.step}
                          </h3>
                          <p className="dx-body" style={{ color: "rgba(255,255,255,0.58)" }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

            </div>

            {/* Sticky sidebar */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-24 self-start">
              <div
                className="rounded-xl p-6 flex flex-col gap-5 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <h3
                  className="text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Indicateurs clés
                </h3>
                <div className="flex flex-col gap-4">
                  {service.kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex flex-col gap-0.5 border-b pb-4 last:border-0 last:pb-0"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      <span className="font-mono text-xl font-bold text-dx-blue-300 tabular-nums">
                        {kpi.value}
                      </span>
                      <span className="dx-caption" style={{ color: "rgba(255,255,255,0.55)" }}>
                        {kpi.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <Link href="/contact" className="btn btn--primary w-full justify-center">
                    Demander une évaluation
                  </Link>
                  <Link
                    href="/contact"
                    className="btn w-full justify-center"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                    }}
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </Container>
      </section>

      {/* Other services */}
      <section
        className="dx-section bg-dx-navy-500 border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <Container>
          <div className="flex flex-col gap-10">
            <RevealOnScroll>
              <div className="flex flex-col gap-3 max-w-xl">
                <div className="dx-eyebrow" style={{ color: "rgba(107,160,220,0.9)" }}>
                  Nos autres services
                </div>
                <h2 className="dx-h2 text-white">
                  Une offre intégrée pour vos installations
                </h2>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherServices.map((s, i) => {
                const OtherIcon = iconMap[s.icon] ?? Wrench;
                return (
                  <RevealOnScroll key={s.slug} delay={i * 45}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex flex-col gap-3 rounded-xl p-5 border transition-all duration-180"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        borderColor: "rgba(255,255,255,0.09)",
                      }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-120"
                        style={{ background: "rgba(31,104,177,0.2)" }}
                      >
                        <OtherIcon size={18} strokeWidth={1.75} className="text-dx-blue-300" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-sans text-sm font-semibold text-white leading-snug">
                          {s.title}
                        </h3>
                        <p className="dx-caption line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                          {s.description}
                        </p>
                      </div>
                      <span className="mt-auto flex items-center gap-1 dx-caption font-semibold text-dx-blue-300 group-hover:gap-2 transition-all duration-120">
                        Découvrir
                        <ArrowRight size={13} strokeWidth={2} />
                      </span>
                    </Link>
                  </RevealOnScroll>
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
