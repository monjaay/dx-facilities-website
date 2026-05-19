import Link from "next/link";
import {
  ArrowRight,
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
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col gap-5 rounded-xl bg-dx-blue-500 p-7 transition-all duration-200 hover:bg-dx-blue-600 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden min-h-[240px]"
    >
      {/* Decorative circle */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/5" />

      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
        <Icon size={28} strokeWidth={1.5} />
      </div>

      <div className="relative flex flex-col gap-2.5 flex-1">
        <h3 className="font-display font-bold text-lg text-white leading-snug uppercase tracking-wide">
          {service.title}
        </h3>
        <p className="text-sm text-white/75 leading-relaxed">
          {service.description}
        </p>
      </div>

      <span className="relative flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white group-hover:gap-3 transition-all duration-150">
        En savoir plus <ArrowRight size={13} strokeWidth={2} />
      </span>
    </Link>
  );
}
