import contentData from "./content.json";

export type TeamMember = {
  name: string;
  role: string;
  company: string;
  bio: string;
  photo: string;
};

export const team: TeamMember[] = contentData.team;
