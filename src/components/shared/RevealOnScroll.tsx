"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "clip";

const variantClass: Record<RevealVariant, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  clip: "reveal-clip",
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
  threshold?: number;
};

export function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "up",
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`${variantClass[variant]} ${className}`}>
      {children}
    </div>
  );
}
