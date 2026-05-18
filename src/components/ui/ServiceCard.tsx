import Link from "next/link";
import {
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
      className="group flex flex-col gap-3.5 rounded-lg border border-t-2 border-t-transparent border-dx-steel-100 bg-white p-6 transition-all duration-180 ease-standard hover:border-dx-steel-300 hover:border-t-dx-blue-500 hover:shadow-md min-h-[240px]"
    >
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-dx-navy-500 text-white">
        <Icon size={24} strokeWidth={1.75} />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-sans text-lg font-semibold text-dx-navy-500 leading-snug">
          {service.title}
        </h3>
        <p className="dx-caption text-dx-steel-500 leading-relaxed">
          {service.description}
        </p>
      </div>

      <span className="dx-caption text-dx-blue-500 font-semibold group-hover:underline">
        En savoir plus
      </span>
    </Link>
  );
}
