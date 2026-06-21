"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in view.
 * `ids` should be a stable array reference (define it at module level or
 * memoise it) to avoid re-subscribing on every render.
 */
export function useScrollSpy(
  ids: string[],
  rootMargin = "-45% 0px -50% 0px",
): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin, threshold: 0 },
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
