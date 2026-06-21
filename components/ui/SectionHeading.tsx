import { Reveal } from "@/components/animations/Reveal";
import { SplitText } from "@/components/animations/SplitText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-accent">
          {index && <span className="text-subtle">{index}</span>}
          <span className="h-px w-6 bg-accent/50" aria-hidden />
          {eyebrow}
        </span>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        className="max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tighter2 sm:text-5xl"
      />
      {description && (
        <Reveal delay={0.08}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
