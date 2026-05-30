import { team } from "@/data/team";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Container } from "@/components/layout/Container";
import contentData from "@/data/content.json";

const { aboutPage } = contentData;

export function TeamGrid() {
  const ts = aboutPage.teamSection;
  return (
    <section className="dx-section" style={{ backgroundColor: "#080c18" }}>
      <Container>
        <div className="flex flex-col gap-14">

          {/* Section header */}
          <div className="flex flex-col gap-4 max-w-xl">
            <RevealOnScroll>
              <div className="dx-eyebrow" style={{ color: "rgba(107,160,220,0.9)" }}>
                {ts.eyebrow}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <h2 className="dx-h2 text-white">{ts.title}</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <p className="dx-lead" style={{ color: "rgba(255,255,255,0.6)" }}>
                {ts.subtitle}
              </p>
            </RevealOnScroll>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <RevealOnScroll key={member.name} delay={i * 60}>
                <div className="flex flex-col gap-4">

                  {/* Photo */}
                  <div className="relative">
                    <ImageSlot
                      src={member.photo || undefined}
                      alt={`${member.name}, ${member.role}`}
                      label="Photo · 1:1"
                      aspectRatio="aspect-square"
                      className="rounded-xl"
                    />
                    {/* Cobalt ring accent */}
                    <div
                      className="absolute inset-0 rounded-xl pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 2px rgba(31,104,177,0.35)" }}
                      aria-hidden
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-base font-bold text-white leading-snug">
                      {member.name}
                    </h3>
                    <p className="dx-caption font-semibold text-dx-blue-300">
                      {member.role}
                    </p>
                    <p className="dx-caption" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {member.company}
                    </p>
                    <p className="dx-caption mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {member.bio}
                    </p>
                  </div>

                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
