import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Contact — Demande d'évaluation gratuite",
  description:
    "Contactez DX Facilities pour une évaluation gratuite de vos besoins en facility management. Réponse sous 24 heures.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-dx-navy-500 py-16">
        <Container>
          <div className="flex flex-col gap-4 max-w-xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="dx-h1 text-white">Parlons de vos installations</h1>
            <p className="dx-lead text-white/70">
              Décrivez vos besoins. Notre équipe vous recontacte sous 24 heures
              ouvrées avec une première analyse.
            </p>
          </div>
        </Container>
      </section>

      <section className="dx-section bg-dx-paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
            <ContactForm />

            <aside className="flex flex-col gap-6">
              <div className="rounded-xl bg-dx-navy-500 p-8 flex flex-col gap-6">
                <h2 className="dx-caption font-semibold uppercase tracking-eyebrow text-white/60">
                  Nos coordonnées
                </h2>

                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-3">
                    <Phone size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Téléphone fixe</span>
                      <a
                        href="tel:+22133843164"
                        className="dx-caption text-white/60 hover:text-white transition-colors duration-120"
                      >
                        +221 33 843 14 64
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Mobile</span>
                      <a
                        href="tel:+221775470346"
                        className="dx-caption text-white/60 hover:text-white transition-colors duration-120"
                      >
                        +221 77 547 03 46
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Email</span>
                      <a
                        href="mailto:info@dxfacilities.com"
                        className="dx-caption text-white/60 hover:text-white transition-colors duration-120"
                      >
                        info@dxfacilities.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Adresse</span>
                      <p className="dx-caption text-white/60 leading-relaxed">
                        Rte de l'aéroport, lot N°88106
                        <br />
                        Yoff ONOMO, Dakar
                        <br />
                        Sénégal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} strokeWidth={1.75} className="shrink-0 mt-0.5 text-dx-blue-300" />
                    <div className="flex flex-col gap-0.5">
                      <span className="dx-caption font-semibold text-white">Horaires</span>
                      <p className="dx-caption text-white/60">
                        Lun. au Ven. : 8h – 18h
                        <br />
                        Astreinte 24/7 pour urgences
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
