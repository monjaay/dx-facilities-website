import { readFileSync } from "fs";
import path from "path";
import { team } from "@/data/team";
import { ImageSlot } from "@/components/shared/ImageSlot";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Container } from "@/components/layout/Container";
import contentData from "@/data/content.json";

const { aboutPage } = contentData;

// Read team-photos.json fresh on each request (dev) / at build time (prod)
function getTeamPhotos(): Record<string, string> {
  try {
    const filePath = path.join(process.cwd(), "src", "data", "team-photos.json");
    return JSON.parse(readFileSync(filePath, "utf-8")) as Record<string, string>;
  } catch {
    return {};
  }
}

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function TeamGrid() {
  const photos = getTeamPhotos();
  const ts = aboutPage.teamSection;
  return (
    <section className="dx-section bg-[#090d1a]">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-xl">
            <Eyebrow>{ts.eyebrow}</Eyebrow>
            <h2 className="dx-h2 text-white">{ts.title}</h2>
            <p className="dx-lead text-white/70">{ts.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {team.map((member) => {
              const slug = nameToSlug(member.name);
              const photo = photos[slug];
              return (
                <div key={member.name} className="flex flex-col gap-4">
                  <ImageSlot
                    src={photo}
                    alt={`${member.name}, ${member.role}`}
                    label="Photo · 1:1"
                    aspectRatio="aspect-square"
                    className="rounded-xl ring-2 ring-dx-blue-500/40"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans text-base font-bold text-white leading-snug">
                      {member.name}
                    </h3>
                    <p className="dx-caption font-semibold text-dx-blue-300">
                      {member.role}
                    </p>
                    <p className="dx-caption text-white/50">{member.company}</p>
                    <p className="dx-caption text-white/60 mt-1 leading-relaxed">
                      {member.bio}
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
