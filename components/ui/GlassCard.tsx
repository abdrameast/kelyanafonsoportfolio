import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/** Soft, glassy surface used for most cards. */
export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-line bg-surface/70 shadow-soft backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
