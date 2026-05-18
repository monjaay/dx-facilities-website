import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function CTABand() {
  return (
    <section className="bg-dx-blue-500 py-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="font-display font-bold text-white leading-snug max-w-xl text-3xl lg:text-[42px]">
            Prêt à transformer votre environnement de travail&#160;?
          </h2>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="btn btn--inverse btn--lg">
              Nous contacter
            </Link>
            <Link href="/contact" className="btn btn--inverse btn--lg">
              Demander un devis
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
