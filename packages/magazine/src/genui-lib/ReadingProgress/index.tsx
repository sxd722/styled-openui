"use client";

import { useEffect, useState } from "react";
import { defineComponent } from "@openuidev/react-lang";
import { ReadingProgressSchema } from "./schema";

export { ReadingProgressSchema } from "./schema";

export type MagazineReadingProgressProps = {
  height?: number;
  variant?: "ink" | "accent";
};

export function MagazineReadingProgressView({
  height = 2,
  variant = "ink",
}: MagazineReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className={`openui-mag-reading-progress openui-mag-reading-progress-${variant}`}
      style={{ height }}
      aria-hidden
    >
      <div
        className="openui-mag-reading-progress__fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export const ReadingProgress = defineComponent({
  name: "ReadingProgress",
  props: ReadingProgressSchema,
  description:
    'Fixed reading-progress bar pinned to the top of the viewport. height in px (default 2). variant: "ink" (default) | "accent". Render once per article page, as the first child of Spread.',
  component: ({ props }) => (
    <MagazineReadingProgressView height={props.height} variant={props.variant} />
  ),
});
