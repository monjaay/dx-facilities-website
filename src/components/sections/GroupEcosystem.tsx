import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";

type GroupEntity = {
  name: string;
  activity: string;
  highlighted?: boolean;
};

const entities: GroupEntity[] = [
  {
    name: "DEXTERA Construction",
    activity: "BTP : innovation, respect des délais et qualité",
  },
  {
    name: "Dextera Real Estate",
    activity: "Immobilier moderne et durable",
  },
  {
    name: "DX Management",
    activity: "Certification ISO, EDGE, BREEAM HQE, AMO, maîtrise d'œuvre, formations",
  },
  {
    name: "DX Facilities",
    activity: "Facility management intégré",
    highlighted: true,
  },
  {
    name: "Opal DX",
    activity: "Fourniture matériel, matériaux, mobilier, électroménager",
  },
];

export function GroupEcosystem() {
  return (
    <section className="dx-section bg-dx-navy-500">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <Eyebrow>DEXTERA GROUP</Eyebrow>
            <h2 className="dx-h2 text-white">
              Un écosystème multisectoriel complémentaire
            </h2>
            <p className="dx-lead text-white/70">
              DX Facilities est l'une des cinq filiales du groupe DEXTERA,
              fondé en 2024 par El Hadji Malick Gueye. Ensemble, elles couvrent
              l'intégralité du cycle de vie d'un bâtiment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {entities.map((entity) => (
              <div
                key={entity.name}
                className={[
                  "flex flex-col gap-3 rounded-lg border p-5 transition-all duration-180",
                  entity.highlighted
                    ? "border-dx-blue-500 bg-dx-blue-500"
                    : "border-white/10 bg-white/[0.06] hover:bg-white/[0.10] hover:border-white/20",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-wide leading-snug">
                  {entity.name}
                </h3>
                <p className="dx-caption text-white/70 leading-relaxed">
                  {entity.activity}
                </p>
                {entity.highlighted && (
                  <span className="dx-eyebrow text-white/60 text-[10px]">
                    Vous êtes ici
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
