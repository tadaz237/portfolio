import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

/** Small pill used for tech tags and labels. */
function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variant === "default" && "bg-muted/70 text-muted-foreground",
        variant === "accent" && "bg-accent/12 text-accent border border-accent/20",
        variant === "outline" && "border border-border text-foreground/80",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
