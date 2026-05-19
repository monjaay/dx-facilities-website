import { CheckCircle, BarChart2, Lightbulb, Headphones } from "lucide-react";
import { Container } from "@/components/layout/Container";

const reasons = [
  {
    icon: CheckCircle,
    title: "Approche intégrée",
    description:
      "Maintenance, fluides, sécurité, propreté, accueil : un seul prestataire, une seule interface.",
  },
  {
    icon: BarChart2,
    title: "Résultats mesurables",
    description:
      "Réduction des coûts par une gestion intelligente des ressources et de la maintenance préventive.",
  },
  {
    icon: Lightbulb,
    title: "Innovation continue",
    description:
      "CMMS, IoT, data analytics : nous intégrons les meilleures technologies pour vos bâtiments.",
  },
  {
    icon: Headphones,
    title: "Service de proximité",
    description:
      "Un interlocuteur dédié, présent à chaque étape de votre contrat, sur toute la durée.",
  },
];

export function WhyUs() {
  return (
    <section className="dx-section bg-dx-navy-600" style={{ background: "#0a0f1e" }}>
      <Container>
        <div className="flex flex-col gap-14">
          <div className="text-center">
            <p className="dx-eyebrow text-dx-blue-400 mb-3">Notre différence</p>
            <h2 className="dx-h2 text-white">
              Pourquoi choisir{" "}
              <span className="text-dx-blue-300">DX Facilities</span> ?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="flex flex-col items-center text-center gap-5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                  <reason.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-bold text-base text-white uppercase tracking-widest">
                    {reason.title} :
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
