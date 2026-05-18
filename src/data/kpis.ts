export type KPI = {
  value: string;
  unit: string;
  label: string;
};

export const kpis: KPI[] = [
  { value: "15+", unit: "ans", label: "d'expertise cumulée" },
  { value: "99,2", unit: "%", label: "de disponibilité cible" },
  { value: "24", unit: "/7", label: "support opérationnel" },
  { value: "100", unit: "%", label: "conformité HSE" },
];
