import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  /** dark = engineering surface (panel styling), light = editorial surface */
  variant?: "light" | "dark";
  className?: string;
}

export function Card({ children, variant = "light", className = "" }: CardProps) {
  const base =
    variant === "dark"
      ? "bg-panel text-panel-ink"
      : "border border-line bg-white/60";
  return (
    <div className={`rounded-lg p-5 ${base} ${className}`}>{children}</div>
  );
}
