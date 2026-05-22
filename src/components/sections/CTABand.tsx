import Link from "next/link";
import { Container } from "@/components/layout/Container";
import contentData from "@/data/content.json";

const { ctaBand } = contentData;

export function CTABand() {
  return (
    <section className="relative bg-dx-blue-500 py-20 overflow-hidden">
      {/* Dot pattern texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <Container>
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <h2 className="font-display font-bold text-white leading-tight text-3xl lg:text-[42px]">
              {ctaBand.title}
            </h2>
            <p className="text-white/70 text-base">{ctaBand.subtitle}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="btn btn--inverse btn--lg">
              {ctaBand.ctaPrimary}
            </Link>
            <Link
              href="/services"
              className="btn btn--lg border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              {ctaBand.ctaSecondary}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
