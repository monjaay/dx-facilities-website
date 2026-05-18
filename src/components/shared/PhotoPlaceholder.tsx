import { Camera } from "lucide-react";

type PhotoPlaceholderProps = {
  label?: string;
  className?: string;
  aspectRatio?: string;
};

export function PhotoPlaceholder({
  label = "Photo · 16:9",
  className = "",
  aspectRatio = "aspect-video",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-dx-steel-200 bg-dx-steel-50 ${aspectRatio} ${className}`}
    >
      <Camera size={32} className="text-dx-steel-400" strokeWidth={1.5} />
      <span className="dx-caption text-dx-steel-400">{label}</span>
    </div>
  );
}
