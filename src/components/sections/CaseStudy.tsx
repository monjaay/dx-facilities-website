import { ImageSlot } from "@/components/shared/ImageSlot";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import contentData from "@/data/content.json";

const { caseStudy, photos } = contentData;

export function CaseStudy() {
  return (
    <section className="dx-section bg-dx-navy-500">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ImageSlot
            src={photos["case-study"] || "/images/case-study.jpg"}
            alt="Complexe de bureaux moderne géré par DX Facilities"
            className="w-full"
          />

          <div className="flex flex-col gap-6">
            <Eyebrow>{caseStudy.eyebrow}</Eyebrow>
            <h2 className="dx-h2 text-white">{caseStudy.title}</h2>
            <p className="dx-body text-white/70">{caseStudy.body}</p>

            <div className="grid grid-cols-3 gap-6 py-4 border-t border-b border-white/10">
              {caseStudy.stats.map((stat) => (
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
                «&#160;{caseStudy.quote}&#160;»
              </p>
              <cite className="dx-caption text-white/50 not-italic">
                {caseStudy.quoteCite}
              </cite>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
