import Image from "next/image";
import type { Figure as FigureData } from "@/lib/site/machines";

type FigureProps = {
  figure: FigureData;
  size?: number;
  priority?: boolean;
};

export function Figure({ figure, size = 96, priority = false }: FigureProps) {
  return (
    <span className="spec-figure" style={{ width: size, height: size }}>
      <Image
        src={figure.src}
        alt={figure.alt}
        fill
        priority={priority}
        quality={90}
        sizes={`${size}px`}
      />
    </span>
  );
}
