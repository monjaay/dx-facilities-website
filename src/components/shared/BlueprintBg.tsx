"use client";
import { useEffect, useRef } from "react";

type Variant = "dark" | "light";

// Animated canvas: breathing dot grid + diagonal brand-angle scan line + corner brackets
// Scan angle matches the DX logo stripe direction (-50deg)
export function BlueprintBg({ variant = "dark" }: { variant?: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number | null = null;

    const resize = () => {
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Color: lighter on dark bg, standard on light bg
    const [cr, cg, cb] = variant === "dark" ? [107, 160, 220] : [31, 104, 177];
    const dotBase = variant === "dark" ? 0.075 : 0.05;
    const dotAmp  = variant === "dark" ? 0.035 : 0.02;
    const scanOp  = variant === "dark" ? 0.09  : 0.065;
    const bktOp   = variant === "dark" ? 0.22  : 0.14;
    const SPACING = 36;

    // Scan line sweeps in the DX brand stripe direction (-50deg)
    const SCAN_INTERVAL = 13800;
    const SCAN_DURATION = 2700;
    let scanStart = performance.now() - SCAN_INTERVAL * 0.88; // first scan appears quickly

    const draw = (ts: number) => {
      raf = null;

      const { width, height } = canvas;
      if (!width || !height) { raf = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, width, height);

      // 1 — Breathing dot grid
      const breathe = Math.sin(ts * 0.00062);
      const dOp = Math.max(0, dotBase + breathe * dotAmp);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${dOp.toFixed(4)})`;
      for (let x = SPACING; x < width; x += SPACING) {
        for (let y = SPACING; y < height; y += SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2 — Diagonal scan line (angle matches brand stripes: -50deg)
      if (ts - scanStart >= SCAN_INTERVAL) scanStart = ts;
      const sp = Math.max(0, Math.min(1, (ts - scanStart) / SCAN_DURATION));
      if (sp < 1) {
        const fade = sp < 0.12 ? sp / 0.12 : sp > 0.88 ? (1 - sp) / 0.12 : 1;
        const lineOp = scanOp * fade;
        const D = Math.max(width, height) * 1.6;

        ctx.save();
        // Rotate canvas around its center by -50deg (brand stripe angle)
        ctx.translate(width / 2, height / 2);
        ctx.rotate(-50 * Math.PI / 180);
        ctx.translate(-width / 2, -height / 2);

        // Sweep "top to bottom" in rotated space = diagonal in real space
        const sweepY = -D * 0.12 + sp * D * 1.24;
        const grad = ctx.createLinearGradient(0, sweepY - 38, 0, sweepY + 38);
        grad.addColorStop(0,   `rgba(${cr},${cg},${cb},0)`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${lineOp.toFixed(4)})`);
        grad.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(width / 2 - D, sweepY - 38, D * 2, 76);
        ctx.restore();
      }

      // 3 — Corner brackets (engineering L-marks, slow breathing pulse)
      const bPulse = 0.72 + 0.28 * Math.sin(ts * 0.0009);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},${(bktOp * bPulse).toFixed(4)})`;
      ctx.lineWidth   = 1.2;
      ctx.lineCap     = "square";

      const ARM = 20;
      const OFF = 22;
      type Corner = [number, number, number, number];
      const corners: Corner[] = [
        [OFF, OFF, 1, 1],
        [width - OFF, OFF, -1, 1],
        [OFF, height - OFF, 1, -1],
        [width - OFF, height - OFF, -1, -1],
      ];
      for (const [cx, cy, sx, sy] of corners) {
        ctx.beginPath();
        ctx.moveTo(cx + sx * ARM, cy);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx, cy + sy * ARM);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    // Pause animation when section is off-screen
    let visible = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && raf === null) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 }
    );
    io.observe(parent);

    // Start immediately (first frame)
    raf = requestAnimationFrame(draw);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
