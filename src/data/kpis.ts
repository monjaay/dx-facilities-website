import contentData from "./content.json";

export type KPI = {
  value: string;
  unit: string;
  label: string;
};

export const kpis: KPI[] = contentData.kpis;
