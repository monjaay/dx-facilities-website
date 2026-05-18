import Link from "next/link";
import { DiagonalStripe } from "@/components/shared/DiagonalStripe";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dx-navy-500">
      <DiagonalStripe
        stripes={[
          { width: "3px", height: "500px", top: "-60px", right: "38%", opacity: 0.2 },
          { width: "2px", height: "600px", top: "-80px", right: "calc(38% + 28px)", opacity: 0.12 },
          { width: "4px", height: "400px", top: "-40px", right: "calc(38% - 24px)", opacity: 0.08 },
        ]}
      />

      <div className="dx-container relative z-10 py-20 lg:py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 animate-fade-rise">
            <Eyebrow>Facility management intégré</Eyebrow>

            <h1 className="dx-display text-white leading-tight text-5xl lg:text-6xl xl:text-[72px]">
              Pilotez vos infrastructures.{" "}
              <span className="text-dx-blue-300">
                Concentrez-vous sur votre métier.
              </span>
            </h1>

            <p className="text-md text-white/75 max-w-[520px] leading-relaxed">
              Maintenance, énergie, sécurité, propreté : DX Facilities prend
              en charge l'intégralité de vos installations pour que vos équipes
              se concentrent sur l'essentiel.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/contact" className="btn btn--primary btn--lg">
                Demander une évaluation gratuite
              </Link>
              <Link href="/services" className="btn btn--inverse btn--lg">
                Découvrir nos services
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <ImageSlot
              src="/images/hero.jpg"
              alt="Technicien DX Facilities en intervention sur site"
              aspectRatio="aspect-[4/5]"
              className="w-full max-w-md mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
