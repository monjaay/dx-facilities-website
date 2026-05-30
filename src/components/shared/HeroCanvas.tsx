"use client";

import { useEffect, useRef } from "react";

// Oscillator — hue stays in cobalt-blue range (185–235)
function makeWave() {
  let phase = Math.random() * 2 * Math.PI;
  return {
    update: () => {
      phase += 0.0015;
      return 210 + Math.sin(phase) * 25;
    },
  };
}

type NodePt = { x: number; y: number; vx: number; vy: number };

const CFG = {
  friction: 0.5,
  trails: 60,
  size: 40,
  dampening: 0.025,
  tension: 0.99,
};

type Trail = { spring: number; friction: number; nodes: NodePt[] };

function makeTrail(spring: number, px: number, py: number): Trail {
  return {
    spring: spring + 0.1 * Math.random() - 0.05,
    friction: CFG.friction + 0.01 * Math.random() - 0.005,
    nodes: Array.from({ length: CFG.size }, () => ({
      x: px, y: py, vx: 0, vy: 0,
    })),
  };
}

function stepTrail(trail: Trail, pos: { x: number; y: number }) {
  let s = trail.spring;
  const n = trail.nodes;
  n[0].vx += (pos.x - n[0].x) * s;
  n[0].vy += (pos.y - n[0].y) * s;
  for (let i = 0; i < n.length; i++) {
    if (i > 0) {
      n[i].vx += (n[i - 1].x - n[i].x) * s;
      n[i].vy += (n[i - 1].y - n[i].y) * s;
      n[i].vx += n[i - 1].vx * CFG.dampening;
      n[i].vy += n[i - 1].vy * CFG.dampening;
    }
    n[i].vx *= trail.friction;
    n[i].vy *= trail.friction;
    n[i].x += n[i].vx;
    n[i].y += n[i].vy;
    s *= CFG.tension;
  }
}

function paintTrail(trail: Trail, ctx: CanvasRenderingContext2D) {
  const n = trail.nodes;
  const L = n.length;
  ctx.beginPath();
  ctx.moveTo(n[0].x, n[0].y);
  for (let i = 1; i < L - 2; i++) {
    ctx.quadraticCurveTo(
      n[i].x, n[i].y,
      0.5 * (n[i].x + n[i + 1].x),
      0.5 * (n[i].y + n[i + 1].y)
    );
  }
  ctx.quadraticCurveTo(n[L - 2].x, n[L - 2].y, n[L - 1].x, n[L - 1].y);
  ctx.stroke();
  ctx.closePath();
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    let started = false;
    const pos = { x: -200, y: -200 };
    let trails: Trail[] = [];
    const wave = makeWave();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const loop = () => {
      if (!running) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(wave.update())}, 85%, 68%, 0.028)`;
      ctx.lineWidth = 9;
      for (const t of trails) {
        stepTrail(t, pos);
        paintTrail(t, ctx);
      }
      requestAnimationFrame(loop);
    };

    const boot = (x: number, y: number) => {
      pos.x = x; pos.y = y;
      if (!started) {
        started = true;
        trails = Array.from({ length: CFG.trails }, (_, i) =>
          makeTrail(0.45 + (i / CFG.trails) * 0.025, x, y)
        );
        loop();
      }
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      boot(e.clientX - r.left, e.clientY - r.top);
      pos.x = e.clientX - r.left;
      pos.y = e.clientY - r.top;
    };

    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      boot(t.clientX - r.left, t.clientY - r.top);
      pos.x = t.clientX - r.left;
      pos.y = t.clientY - r.top;
    };

    // Attach to parent section so canvas (pointer-events-none) still picks up moves
    const parent = canvas.parentElement;
    resize();
    window.addEventListener("resize", resize);
    parent?.addEventListener("mousemove", onMouse);
    parent?.addEventListener("touchstart", onTouch, { passive: true });
    parent?.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("mousemove", onMouse);
      parent?.removeEventListener("touchstart", onTouch);
      parent?.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
