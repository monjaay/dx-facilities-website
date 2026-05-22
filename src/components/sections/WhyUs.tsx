import { CheckCircle, BarChart2, Lightbulb, Headphones, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import contentData from "@/data/content.json";

const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  BarChart2,
  Lightbulb,
  Headphones,
};

const { whyUs } = contentData;

export function WhyUs() {
  return (
    <section className="dx-section bg-dx-navy-600" style={{ background: "#0a0f1e" }}>
      <Container>
        <div className="flex flex-col gap-14">
          <div className="text-center">
            <p className="dx-eyebrow text-dx-blue-400 mb-3">{whyUs.eyebrow}</p>
            <h2 className="dx-h2 text-white">
              {whyUs.title}{" "}
              <span className="text-dx-blue-300">{whyUs.titleAccent}</span>
              {whyUs.titleSuffix}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.reasons.map((reason) => {
              const Icon = iconMap[reason.icon] ?? CheckCircle;
              return (
                <div
                  key={reason.title}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                    <Icon size={28} strokeWidth={1.5} />
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
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
