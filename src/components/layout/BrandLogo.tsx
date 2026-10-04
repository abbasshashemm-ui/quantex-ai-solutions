import { getImageProps } from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

/** Dark artwork for the light theme, light artwork for the dark theme. */
const ARTWORK = {
  full: {
    light: "/quantex-logo-dark.png",
    dark: "/quantex-logo.png",
    alt: "QUANTEX",
    width: 360,
    height: 72,
    sizes: "(max-width: 768px) 200px, 260px",
    className: "h-8 w-auto max-w-[min(260px,58vw)]",
  },
  mark: {
    light: "/quantex-mark-dark.png",
    dark: "/quantex-mark.png",
    alt: "Quantex",
    width: 40,
    height: 40,
    sizes: "40px",
    className: "h-9 w-auto",
  },
} as const;

export function BrandLogo({
  className,
  priority = false,
  variant = "full",
}: BrandLogoProps) {
  const art = ARTWORK[variant];
  const shared = {
    alt: art.alt,
    width: art.width,
    height: art.height,
    sizes: art.sizes,
    quality: 70,
    priority,
  };
  const { props: dark } = getImageProps({
    ...shared,
    priority: false,
    src: art.dark,
  });
  const { props: light } = getImageProps({ ...shared, src: art.light });
  const size = className ?? art.className;

  // Both are in the page and CSS shows the one for the current theme (the
  // theme can change without a reload, which <picture> could not follow).
  // Only the light file is preloaded; the dark one is lazy, so it is fetched
  // only once it is shown.
  /* eslint-disable @next/next/no-img-element -- props come from getImageProps */
  return (
    <>
      <img {...light} alt={art.alt} className={`${size} brand-logo-light`} />
      <img {...dark} alt="" className={`${size} brand-logo-dark`} />
    </>
  );
  /* eslint-enable @next/next/no-img-element */
}
