import type { ReactNode } from "react";

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Animated cobalt glow-border wrapper — CSS only, no shadcn/radix deps.
 * The border pulses between cobalt and bright blue.
 */
export function ShineBorder({ children, className = "" }: ShineBorderProps) {
  return (
    <div
      className={`shine-border-outer ${className}`}
      style={{ display: "inline-block", borderRadius: "8px" }}
    >
      {children}
    </div>
  );
}
