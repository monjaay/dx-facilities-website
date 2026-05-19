import { ImageSlot } from "@/components/shared/ImageSlot";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";

export function CaseStudy() {
  return (
    <section className="dx-section bg-dx-navy-500">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ImageSlot
            src="/images/case-study.jpg"
            alt="Complexe de bureaux moderne géré par DX Facilities"
            className="w-full"
          />

          <div className="flex flex-col gap-6">
            <Eyebrow>Étude de cas</Eyebrow>
            <h2 className="dx-h2 text-white">
              Réduction de 22 % des coûts opérationnels pour un complexe de
              bureaux de 15 000 m²
            </h2>
            <p className="dx-body text-white/70">
              En déployant une stratégie de maintenance prédictive couplée à un
              système de monitoring énergétique, DX Facilities a permis à ce
              client de réduire ses coûts opérationnels de 22 % en 18 mois, tout
              en maintenant un taux de disponibilité de 99,4 %.
            </p>

            <div className="grid grid-cols-3 gap-6 py-4 border-t border-b border-white/10">
              {[
                { value: "- 22 %", label: "coûts opérationnels" },
                { value: "99,4 %", label: "disponibilité" },
                { value: "18 mois", label: "durée de déploiement" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display font-bold text-3xl text-dx-blue-300 leading-tight">
                    {stat.value}
                  </span>
                  <span className="dx-caption text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>

            <blockquote className="flex flex-col gap-2 pl-4 border-l-2 border-dx-blue-400">
              <p className="dx-body text-white/80 italic">
                «&#160;DX Facilities a transformé notre gestion des
                installations. Nous avons enfin une visibilité complète sur
                notre patrimoine technique.&#160;»
              </p>
              <cite className="dx-caption text-white/50 not-italic">
                Directeur des opérations, groupe immobilier dakarois
              </cite>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
