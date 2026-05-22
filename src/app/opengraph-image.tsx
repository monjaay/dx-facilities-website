import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DX Facilities — Facility Management Intégré au Sénégal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#13182E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Diagonal accent */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: "28%",
            width: 3,
            height: 500,
            background: "#1F68B1",
            opacity: 0.35,
            transform: "rotate(-50deg)",
            transformOrigin: "top center",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -40,
            right: "calc(28% + 28px)",
            width: 2,
            height: 400,
            background: "#1F68B1",
            opacity: 0.18,
            transform: "rotate(-50deg)",
            transformOrigin: "top center",
          }}
        />

        {/* Cobalt badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "#1F68B1",
              borderRadius: 8,
              padding: "6px 16px",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Facility Management · Sénégal
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.0,
            marginBottom: 20,
            maxWidth: 780,
          }}
        >
          DX{" "}
          <span style={{ color: "#6BA0DC" }}>Facilities</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.65)",
            fontWeight: 400,
            lineHeight: 1.4,
            maxWidth: 700,
            marginBottom: 48,
          }}
        >
          Maintenance · Énergie · Sécurité · Propreté · Smart Buildings
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 24,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 16 }}>
            www.dxfacilities.com
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
            Membre de DEXTERA GROUP
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
