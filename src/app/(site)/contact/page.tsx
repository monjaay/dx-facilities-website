import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
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

export default function ContactPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16">
        <Container>
          <div className="flex flex-col gap-4 max-w-xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="dx-h1 text-white">{hero.title}</h1>
            <p className="dx-lead text-white/70">{hero.subtitle}</p>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-[#090d1a]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
            <ContactForm />

            <aside className="flex flex-col gap-6">
              <div className="rounded-xl bg-dx-blue-500 p-8 flex flex-col gap-6">
                <h2 className="dx-caption font-bold uppercase tracking-eyebrow text-white">
                  Nos coordonnées
                </h2>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <Phone size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-white" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Téléphone fixe</span>
                      <a
                        href={`tel:${info.phone.replace(/\s/g, "")}`}
                        className="dx-caption text-white/75 hover:text-white transition-colors duration-120"
                      >
                        {info.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-white" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Mobile</span>
                      <a
                        href={`tel:${info.mobile.replace(/\s/g, "")}`}
                        className="dx-caption text-white/75 hover:text-white transition-colors duration-120"
                      >
                        {info.mobile}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-white" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Email</span>
                      <a
                        href={`mailto:${info.email}`}
                        className="dx-caption text-white/75 hover:text-white transition-colors duration-120"
                      >
                        {info.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-white" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Adresse</span>
                      <p className="dx-caption text-white/75 leading-relaxed whitespace-pre-line">
                        {info.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-white" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Horaires</span>
                      <p className="dx-caption text-white/75 whitespace-pre-line">
                        {info.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
