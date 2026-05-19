import Link from "next/link";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";

export function ServicesGrid() {
  return (
    <section className="dx-section bg-dx-navy-500">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <Eyebrow>Nos services</Eyebrow>
            <h2 className="dx-h2 text-white">
              Une offre complète de facility management
            </h2>
            <p className="dx-lead text-white/60">
              Huit domaines d'expertise intégrés pour gérer l'intégralité de
              vos installations, de la maintenance technique à la propreté des
              espaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/services" className="btn btn--inverse btn--lg">
              Voir tous nos services
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
