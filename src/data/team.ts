import contentData from "./content.json";

export type TeamMember = {
  name: string;
  role: string;
  company: string;
  bio: string;
};

export const team: TeamMember[] = contentData.team;
