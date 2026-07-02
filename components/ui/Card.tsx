import { HTMLAttributes } from "react";
import { clsx } from "clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-border bg-surface p-5 transition-colors duration-150",
        "hover:border-[#30363D]",
        className
      )}
      {...props}
    />
  );
}
