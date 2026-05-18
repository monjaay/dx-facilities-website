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
    <section className="dx-section bg-dx-paper">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <Eyebrow>DEXTERA GROUP</Eyebrow>
            <h2 className="dx-h2 text-dx-navy-500">
              Un écosystème multisectoriel complémentaire
            </h2>
            <p className="dx-lead text-dx-steel-600">
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
                    ? "border-t-2 border-dx-blue-500 border-t-dx-blue-500 bg-dx-blue-50 shadow-sm"
                    : "border-dx-steel-200 bg-white hover:border-dx-steel-300 hover:shadow-sm",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h3 className="font-sans text-sm font-semibold text-dx-navy-500 leading-snug">
                  {entity.name}
                </h3>
                <p className="dx-caption text-dx-steel-600 leading-relaxed">
                  {entity.activity}
                </p>
                {entity.highlighted && (
                  <span className="dx-eyebrow text-dx-blue-600 text-[10px]">
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
