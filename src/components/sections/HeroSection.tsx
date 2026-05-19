const heroMetallic =
  "bg-[linear-gradient(135deg,#6b7280_0%,#c0c5ce_28%,#ffffff_52%,#9ca3af_78%,#4b5563_100%)] bg-clip-text text-transparent [-webkit-text-fill-color:transparent]";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative grid min-h-[100dvh] grid-rows-[minmax(0,1.15fr)_auto_minmax(4.5rem,0.72fr)] px-4 pt-[calc(6rem+env(safe-area-inset-top))] sm:px-6 sm:pt-32 md:grid-rows-[minmax(0,1.05fr)_auto_minmax(5rem,0.85fr)]"
    >
      <div aria-hidden className="min-h-0" />

      <div className="w-full px-1 text-center sm:px-2">
        <p
          className={`text-[0.7rem] font-medium tracking-[0.2em] uppercase sm:text-xs sm:tracking-[0.35em] ${heroMetallic}`}
        >
          Quantex AI Solutions
        </p>
        <h1
          className={`mt-2.5 text-balance text-[2.15rem] font-semibold leading-[1.08] tracking-tight sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl ${heroMetallic}`}
        >
          Web design engineered to convert
        </h1>
      </div>

      <div aria-hidden className="min-h-0" />
    </section>
  );
}
