import Image from "next/image";

type HeroMediaProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function HeroMedia({ src, alt, priority = false }: HeroMediaProps) {
  return (
    <div className="hero-media">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-contain object-center"
      />
    </div>
  );
}
