import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Container } from "@/components/layout/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import contentData from "@/data/content.json";

export const metadata: Metadata = {
  title: "Contact — Évaluation gratuite de vos besoins en Facility Management",
  description:
    "Contactez DX Facilities à Dakar pour une évaluation gratuite de vos besoins en facility management. Maintenance, énergie, sécurité, propreté — réponse sous 24 heures. Tél : +221 33 843 14 64.",
  alternates: { canonical: "https://www.dxfacilities.com/contact" },
  keywords: [
    "contact facility management Dakar",
    "devis facility management Sénégal",
    "DX Facilities contact",
    "évaluation gratuite maintenance Dakar",
  ],
  openGraph: {
    url: "https://www.dxfacilities.com/contact",
    title: "Contactez DX Facilities — Évaluation gratuite à Dakar",
    description:
      "Demandez votre évaluation gratuite en facility management. Basés à Dakar, nous répondons sous 24 h.",
  },
};

const { contactPage } = contentData;
const { hero, info } = contactPage;

const contactItems = [
  {
    Icon: Phone,
    label: "Téléphone fixe",
    value: info.phone,
    href: `tel:${info.phone.replace(/\s/g, "")}`,
  },
  {
    Icon: Phone,
    label: "Mobile",
    value: info.mobile,
    href: `tel:${info.mobile.replace(/\s/g, "")}`,
  },
  {
    Icon: Mail,
    label: "Email",
    value: info.email,
    href: `mailto:${info.email}`,
  },
  {
    Icon: MapPin,
    label: "Adresse",
    value: info.address,
    href: undefined,
    multiline: true,
  },
  {
    Icon: Clock,
    label: "Horaires",
    value: info.hours,
    href: undefined,
    multiline: true,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-dx-navy-500 relative overflow-hidden py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="dx-stripe absolute"
            style={{ width: "3px", height: "400px", top: "-60px", right: "22%", opacity: 0.16 }} />
          <div className="dx-stripe absolute"
            style={{ width: "2px", height: "320px", top: "-40px", right: "calc(22% + 28px)", opacity: 0.08 }} />
        </div>
        <Container className="relative z-10">
          <div className="flex flex-col gap-5 max-w-xl animate-fade-rise">
            <span className="dx-eyebrow-pill dx-eyebrow-pill--dark">
              <span className="dot" aria-hidden />
              {hero.eyebrow}
            </span>
            <h1 className="dx-h1 text-white">{hero.title}</h1>
            <p className="dx-lead" style={{ color: "rgba(255,255,255,0.65)" }}>
              {hero.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Form + contact info */}
      <section className="dx-section" style={{ backgroundColor: "#080c18" }}>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">

            {/* Form */}
            <RevealOnScroll variant="left">
              <ContactForm />
            </RevealOnScroll>

            {/* Contact info sidebar */}
            <RevealOnScroll variant="right" delay={80}>
              <div className="flex flex-col gap-6">

                {/* Info card */}
                <div
                  className="rounded-xl p-7 flex flex-col gap-6 border"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  <h2
                    className="text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Nos coordonnées
                  </h2>

                  <div className="flex flex-col gap-5">
                    {contactItems.map(({ Icon, label, value, href, multiline }) => (
                      <div key={label} className="flex items-start gap-3.5">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg mt-0.5"
                          style={{
                            background: "rgba(31,104,177,0.15)",
                            border: "1px solid rgba(31,104,177,0.2)",
                          }}
                        >
                          <Icon size={15} strokeWidth={1.75} className="text-dx-blue-300" />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-xs font-semibold uppercase tracking-wide"
                            style={{ color: "rgba(255,255,255,0.35)" }}
                          >
                            {label}
                          </span>
                          {href ? (
                            <a
                              href={href}
                              className="dx-caption text-white/75 hover:text-white transition-colors duration-120"
                            >
                              {value}
                            </a>
                          ) : (
                            <p
                              className={[
                                "dx-caption text-white/75",
                                multiline ? "whitespace-pre-line leading-relaxed" : "",
                              ].join(" ")}
                            >
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement pill */}
                <div
                  className="rounded-xl p-6 flex items-start gap-4 border"
                  style={{
                    background: "rgba(31,104,177,0.1)",
                    borderColor: "rgba(31,104,177,0.2)",
                  }}
                >
                  <div className="shrink-0">
                    <ArrowRight size={20} className="text-dx-blue-300 mt-0.5" strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-semibold text-white">
                      Réponse garantie sous 24 h
                    </p>
                    <p className="dx-caption" style={{ color: "rgba(255,255,255,0.55)" }}>
                      Après réception de votre formulaire, un expert DX Facilities vous contacte
                      dans les 24 heures pour planifier votre évaluation gratuite.
                    </p>
                  </div>
                </div>

              </div>
            </RevealOnScroll>

          </div>
        </Container>
      </section>
    </>
  );
}
