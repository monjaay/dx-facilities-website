import Image from "next/image";
import { Camera } from "lucide-react";

type ImageSlotProps = {
  // Replace `src` with a local path (e.g. "/images/hero.jpg") or a Cloudinary URL to swap this placeholder
  src?: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
};

export function ImageSlot({
  src,
  alt,
  label = "Photo · 16:9",
  aspectRatio = "aspect-video",
  className = "",
  priority = false,
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${aspectRatio} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-dx-steel-200 bg-dx-steel-50 ${aspectRatio} ${className}`}
    >
      <Camera size={32} className="text-dx-steel-400" strokeWidth={1.5} />
      <span className="dx-caption text-dx-steel-400">{label}</span>
    </div>
  );
}
