import { getImageProps } from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "full" | "mark";
};

/** Dark artwork for the light theme, light artwork for the dark theme. */
const MARK = {
  light: "/quantex-mark-dark.png",
  dark: "/quantex-mark.png",
  alt: "Quantex",
  width: 40,
  height: 40,
  sizes: "40px",
  className: "h-9 w-auto",
} as const;

export function BrandLogo({
  className,
  priority = false,
  variant = "full",
}: BrandLogoProps) {
  // The wordmark is live text in the same condensed italic as the headlines,
  // so it needs no image and always matches the theme.
  if (variant === "full") {
    return (
      <span className={`brand-wordmark ${className ?? "text-[1.75rem]"}`}>
        Quantex
      </span>
    );
  }

  const shared = {
    alt: MARK.alt,
    width: MARK.width,
    height: MARK.height,
    sizes: MARK.sizes,
    quality: 70,
    priority,
  };
  const { props: dark } = getImageProps({
    ...shared,
    priority: false,
    src: MARK.dark,
  });
  const { props: light } = getImageProps({ ...shared, src: MARK.light });
  const size = className ?? MARK.className;

  // Both are in the page and CSS shows the one for the current theme (the
  // theme can change without a reload, which <picture> could not follow).
  // Only the light file is preloaded; the dark one is lazy, so it is fetched
  // only once it is shown.
  /* eslint-disable @next/next/no-img-element -- props come from getImageProps */
  return (
    <>
      <img {...light} alt={MARK.alt} className={`${size} brand-logo-light`} />
      <img {...dark} alt="" className={`${size} brand-logo-dark`} />
    </>
  );
  /* eslint-enable @next/next/no-img-element */
}
