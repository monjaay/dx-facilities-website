import contentData from "./content.json";

export type ServiceIconName =
  | "Wrench"
  | "BarChart3"
  | "Cpu"
  | "Activity"
  | "Zap"
  | "Shield"
  | "Sparkles"
  | "Users";

export type ServiceKPI = {
  value: string;
  label: string;
};

export type ServiceProcess = {
  step: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  category: string;
  icon: ServiceIconName;
  description: string;
  tagline: string;
  intro: string;
  details: string;
  features: string[];
  process: ServiceProcess[];
  kpis: ServiceKPI[];
};

export const services: Service[] = contentData.services as Service[];

export const serviceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
