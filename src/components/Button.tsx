import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "md" | "lg" | "sm";
  full?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  full,
  className = "",
  children,
  ...rest
}: Props) {
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3.5 text-base",
  }[size];
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 shadow-soft",
    secondary: "bg-primary-soft text-primary hover:bg-primary-soft/70",
    ghost: "text-navy hover:bg-muted",
    outline: "border border-border text-navy bg-card hover:bg-muted",
    danger: "bg-risk-red text-white hover:opacity-90",
  }[variant];
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition ${sizes} ${variants} ${
        full ? "w-full" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
