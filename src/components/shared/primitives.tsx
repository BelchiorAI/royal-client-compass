import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "purple" | "orange" | "whatsapp";

const toneClasses: Record<Tone, string> = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  info: "bg-info-bg text-info",
  neutral: "bg-neutral-bg text-neutral",
  purple: "bg-purple-bg text-purple",
  orange: "bg-orange-bg text-orange",
  whatsapp: "bg-whatsapp-bg text-whatsapp",
};

export function Pill({
  tone = "neutral",
  dot,
  children,
  className,
}: {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-medium leading-4 whitespace-nowrap",
        toneClasses[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const ini = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const sizes = {
    sm: "size-7 text-[11px]",
    md: "size-9 text-xs",
    lg: "size-12 text-sm",
    xl: "size-16 text-lg",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold avatar-gradient",
        sizes[size],
        className,
      )}
    >
      {ini}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  tone = "neutral",
  icon,
}: {
  label: string;
  value: string | number;
  delta?: string;
  tone?: Tone;
  icon?: ReactNode;
}) {
  return (
    <div className="surface p-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {icon && <span className={cn("rounded-md p-1.5", toneClasses[tone])}>{icon}</span>}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight numeric">{value}</p>
      {delta && <p className="mt-1 text-[11.5px] text-muted-foreground">{delta}</p>}
    </div>
  );
}

export function ProgressBar({ value, tone = "info", className }: { value: number; tone?: Tone; className?: string }) {
  const bar: Record<Tone, string> = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-primary",
    neutral: "bg-neutral",
    purple: "bg-purple",
    orange: "bg-orange",
    whatsapp: "bg-whatsapp",
  };
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-canvas", className)}>
      <div className={cn("h-full rounded-full transition-all duration-700", bar[tone])} style={{ width: `${value}%` }} />
    </div>
  );
}

export function SectionCard({
  title,
  action,
  children,
  className,
  padded = true,
}: {
  title?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("surface", className)}>
      {title && (
        <header className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-[13px] font-semibold">{title}</h3>
          {action}
        </header>
      )}
      <div className={padded ? "p-4" : undefined}>{children}</div>
    </section>
  );
}

export const btn = {
  primary:
    "inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-3.5 text-[13px] font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
  secondary:
    "inline-flex h-9 items-center gap-2 rounded-lg border bg-card px-3.5 text-[13px] font-medium text-foreground shadow-sm transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
  ghost:
    "inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[12.5px] font-medium text-muted-foreground transition-colors hover:bg-canvas hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  icon: "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-canvas hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  input:
    "h-9 w-full rounded-lg border bg-card px-3 text-[13px] text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-shadow",
};

export function statusTone(status: string): Tone {
  const s = status.toLowerCase();
  if (["verified", "signed", "active", "approved", "paid", "compliant", "healthy", "clear", "connected", "done"].includes(s))
    return "success";
  if (["pending", "in review", "review", "onboarding", "medium", "attention"].includes(s)) return "warning";
  if (["expired", "declined", "lapsed", "high", "urgent", "at_risk", "flagged", "cancelled"].includes(s)) return "danger";
  if (["awaiting signature", "awaiting", "open", "low", "info", "scheduled"].includes(s)) return "info";
  return "neutral";
}
