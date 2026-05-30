import Link from "next/link";
import {
  ArrowUpRight,
  Wrench,
  BarChart3,
  Cpu,
  Activity,
  Zap,
  Shield,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  BarChart3,
  Cpu,
  Activity,
  Zap,
  Shield,
  Sparkles,
  Users,
};

type ServiceCardProps = {
  service: Service;
  /** "light" (default) — white card on paper bg | "dark" — glass card on navy bg */
  variant?: "light" | "dark";
};

export function ServiceCard({ service, variant = "light" }: ServiceCardProps) {
  const Icon = iconMap[service.icon] ?? Wrench;
  const isDark = variant === "dark";

  return (
    <Link
      href={`/services/${service.slug}`}
      className={[
        "dx-card-hover group flex flex-col gap-5 rounded-xl p-6 min-h-[220px]",
        isDark
          ? "border"
          : "bg-white border border-dx-steel-100",
      ].join(" ")}
      style={isDark ? {
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.1)",
      } : undefined}
    >
      {/* Icon block */}
      <div
        className={[
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors duration-180",
          isDark
            ? "text-dx-blue-300 group-hover:text-white"
            : "bg-dx-navy-500 text-white group-hover:bg-dx-blue-500",
        ].join(" ")}
        style={isDark ? {
          background: "rgba(31,104,177,0.12)",
          border: "1px solid rgba(31,104,177,0.2)",
        } : undefined}
      >
        <Icon size={22} strokeWidth={1.75} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className={[
            "text-base font-semibold leading-snug transition-colors duration-120",
            isDark
              ? "text-white group-hover:text-dx-blue-300"
              : "text-dx-navy-500 group-hover:text-dx-blue-600",
          ].join(" ")}
        >
          {service.title}
        </h3>
        <p
          className={[
            "text-sm leading-relaxed",
            isDark ? "text-white/55" : "text-dx-steel-500",
          ].join(" ")}
        >
          {service.description}
        </p>
      </div>

      {/* Arrow link */}
      <span
        className={[
          "flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-180",
          isDark ? "text-dx-blue-300" : "text-dx-blue-500",
        ].join(" ")}
      >
        En savoir plus
        <ArrowUpRight size={13} strokeWidth={2.5} />
      </span>
    </Link>
  );
}
