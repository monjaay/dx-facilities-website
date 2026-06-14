"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf: number;
    let mx = -300, my = -300;
    let rx = -300, ry = -300;
    let isHovering = false;
    let isVisible = false;

    const show = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const hide = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isVisible) {
        rx = mx;
        ry = my;
        show();
      }
    };

    // Track hover state via event delegation
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest(
        "a, button, [role='button'], input, select, textarea, label, [tabindex]"
      );
      isHovering = !!el;
    };

    const animate = () => {
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      const s = isHovering ? 1.65 : 1;
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(${s})`;
      ring.style.borderColor = isHovering
        ? "rgba(31,104,177,0.75)"
        : "rgba(31,104,177,0.40)";
      dot.style.transform = isHovering
        ? `translate(${mx - 4}px, ${my - 4}px) scale(0)`
        : `translate(${mx - 4}px, ${my - 4}px) scale(1)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", hide);
    document.documentElement.addEventListener("mouseenter", show);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring"
        style={{ opacity: 0 }}
      />
    </>
  );
}
