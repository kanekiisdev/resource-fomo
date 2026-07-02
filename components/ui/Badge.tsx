import { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: "blue" | "emerald" | "amber" | "red" | "neutral";
}

const colorStyles: Record<string, string> = {
  blue: "bg-blue-500/10 text-accent-blue border-blue-500/20",
  emerald: "bg-emerald-500/10 text-accent-emerald border-emerald-500/20",
  amber: "bg-amber-500/10 text-accent-amber border-amber-500/20",
  red: "bg-red-500/10 text-accent-red border-red-500/20",
  neutral: "bg-white/5 text-muted border-white/10",
};

export function Badge({ className, color = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono",
        colorStyles[color],
        className
      )}
      {...props}
    />
  );
}
