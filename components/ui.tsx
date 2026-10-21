import type { ReactNode } from "react";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Shared button styling so links and buttons look identical. */
export function buttonClass(variant: "gold" | "navy" | "ghost-light" | "ghost-dark" = "gold", className?: string) {
  return cx(
    "group/button inline-flex min-h-13 items-center justify-center gap-4 rounded-full px-6 text-[0.9375rem] font-semibold tracking-[-0.01em] whitespace-nowrap",
    "transition-[background-color,color,box-shadow,transform] duration-300 ease-(--ease-out-expo) active:scale-[0.98]",
    variant === "gold" && "bg-gold text-navy hover:bg-gold-300 hover:shadow-[0_10px_30px_-12px_rgb(255_208_51/0.8)]",
    variant === "navy" && "bg-navy text-white hover:bg-navy-700",
    variant === "ghost-light" && "text-white ring-1 ring-white/35 ring-inset hover:bg-white hover:text-navy",
    variant === "ghost-dark" && "text-navy ring-1 ring-navy/25 ring-inset hover:bg-navy hover:text-white",
    className,
  );
}

/** Arrow that nudges on hover of the parent `group/button`. */
export function ButtonArrow({ icon }: { icon: ReactNode }) {
  return (
    <span className="-mr-1 inline-flex text-lg transition-transform duration-300 ease-(--ease-out-expo) group-hover/button:translate-x-1">
      {icon}
    </span>
  );
}

/** Small mono index label used at the top of each section. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("flex items-center gap-3 mono-label", className)}>
      <span className="tabular-nums">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-30" />
      <span>{children}</span>
    </p>
  );
}
