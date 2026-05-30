import Image from "next/image";

const LOGO_URL =
  "https://res.cloudinary.com/dcubjimoc/image/upload/v1777295664/LOGO_DX_FACILITIES_yc8fuq.png";

type Props = {
  /** Opacity of the watermark (0–1). Defaults to 0.045 */
  opacity?: number;
  /** Position anchor. Defaults to "center-right" */
  position?: "center" | "center-right" | "bottom-right" | "top-left";
  /** Scale factor. Defaults to 1 */
  scale?: number;
};

const positionStyles: Record<NonNullable<Props["position"]>, React.CSSProperties> = {
  "center": {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  "center-right": {
    top: "50%",
    right: "-8%",
    transform: "translateY(-50%)",
  },
  "bottom-right": {
    bottom: "-5%",
    right: "-5%",
  },
  "top-left": {
    top: "-5%",
    left: "-5%",
  },
};

export function LogoWatermark({
  opacity = 0.045,
  position = "center-right",
  scale = 1,
}: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute select-none"
      style={{
        ...positionStyles[position],
        opacity,
        width: `${560 * scale}px`,
        height: "auto",
        zIndex: 0,
      }}
    >
      <Image
        src={LOGO_URL}
        alt=""
        width={870}
        height={739}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
        className="brightness-0 invert"
        draggable={false}
      />
    </div>
  );
}
