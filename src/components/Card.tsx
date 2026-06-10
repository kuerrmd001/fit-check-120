import type { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", children, ...rest }: Props) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-4 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
