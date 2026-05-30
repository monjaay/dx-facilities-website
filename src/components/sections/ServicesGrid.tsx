import Link from "next/link";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Container } from "@/components/layout/Container";

export function ServicesGrid() {
  return (
    <section className="dx-section bg-dx-paper">
      <Container>
        <div className="flex flex-col gap-14">

          {/* Section header */}
          <div className="flex flex-col gap-4 max-w-2xl">
            <RevealOnScroll>
              <div className="dx-eyebrow">Nos services</div>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <h2 className="dx-h2 text-dx-navy-500">
                Une offre complète de{" "}
                <span className="text-dx-blue-500">facility management</span>
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <p className="dx-lead text-dx-steel-600">
                Huit domaines d'expertise intégrés pour gérer l'intégralité de
                vos installations, de la maintenance technique à la propreté des
                espaces.
              </p>
            </RevealOnScroll>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <RevealOnScroll key={service.slug} delay={i * 55} threshold={0.05}>
                <ServiceCard service={service} />
              </RevealOnScroll>
            ))}
          </div>

          {/* Bottom CTA */}
          <RevealOnScroll delay={200}>
            <div className="flex justify-center">
              <Link href="/services" className="btn btn--secondary btn--lg">
                Voir tous nos services
              </Link>
            </div>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  );
}
