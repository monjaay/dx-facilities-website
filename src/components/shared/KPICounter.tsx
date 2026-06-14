"use client";

import { useEffect, useRef, useState } from "react";

function parseValue(raw: string): { num: number; suffix: string; decimals: number } {
  const hasPlus = raw.includes("+");
  const clean = raw.replace("+", "").replace(",", ".");
  const num = parseFloat(clean) || 0;
  const decimals = clean.includes(".") ? clean.split(".")[1]?.length ?? 0 : 0;
  return { num, suffix: hasPlus ? "+" : "", decimals };
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

type Props = {
  value: string;
  unit: string;
};

export function KPICounter({ value, unit }: Props) {
  const [display, setDisplay] = useState(value);
  const hasRun = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { num, suffix, decimals } = parseValue(value);
    const startNum = num > 50 ? num * 0.55 : 0;
    const duration = 1500;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        const t0 = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - t0) / duration, 1);
          const current = startNum + (num - startNum) * easeOut(progress);

          const formatted =
            decimals > 0
              ? current.toFixed(decimals).replace(".", ",")
              : Math.floor(current).toString();
          setDisplay(formatted + (progress >= 1 ? suffix : ""));

          if (progress < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };

        requestAnimationFrame(tick);
        observer.unobserve(el);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, unit]);

  return (
    <div
      ref={ref}
      className="kpi-number text-white leading-none mb-2"
      style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
    >
      {display}
      <span
        className="text-dx-blue-300 ml-1.5"
        style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}
      >
        {unit}
      </span>
    </div>
  );
}
