import Image from "next/image";
import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

const DEVICES = [
  {
    href: "/services/custom-intelligent-chatbots",
    title: "AI assistants",
    body: "Grounded in your content, live on web and WhatsApp, with a human handoff.",
    lines: [
      ["ASSISTANT", "ONLINE"],
      ["KNOWLEDGE", "GROUNDED"],
      ["HANDOFF", "WHATSAPP"],
    ],
  },
  {
    href: "/services/high-converting-websites",
    title: "Search-ready websites",
    body: "Next.js builds with clean structure and fast vitals from the first commit.",
    lines: [
      ["STRUCTURE", "CLEAN"],
      ["VITALS", "TUNED"],
      ["INDEX", "READY"],
    ],
  },
  {
    href: "/services/custom-software-development",
    title: "Software & automation",
    body: "Internal tools and workflows that remove manual steps, documented at handover.",
    lines: [
      ["WORKFLOWS", "AUTOMATED"],
      ["HANDOVER", "DOCUMENTED"],
      ["SUPPORT", "POST-LAUNCH"],
    ],
  },
] as const;

function Knob() {
  return <span className="device__knob" aria-hidden />;
}

function Readout({ lines }: { lines: readonly (readonly [string, string])[] }) {
  return (
    <div className="device__screen" aria-hidden>
      {lines.map(([label, value]) => (
        <p key={label}>
          <span>{label}</span>
          <b>{value}</b>
        </p>
      ))}
      <i className="device__bars">
        <u />
        <u />
        <u />
        <u />
        <u />
      </i>
    </div>
  );
}

export function SystemShowcase() {
  return (
    <section
      className="showcase relative px-4 py-20 sm:px-6 sm:py-24 md:py-28"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="showcase__header" data-reveal>
          <PageEyebrow>[ 02 / The stack ]</PageEyebrow>
          <h2
            id="showcase-heading"
            className="section-heading mt-3 max-w-3xl text-metallic-gradient"
          >
            One team, built like hardware.
          </h2>
          <p className="showcase__tag">[ Tailored code. Zero limitations. ]</p>
        </header>

        <div className="showcase__grid">
          <article className="device device--lead" data-reveal>
            <Image
              src="/visuals/stack-lead.webp"
              alt="Quantex rack panel with an amber display reading assistant online, knowledge grounded, handoff WhatsApp"
              width={2000}
              height={333}
              quality={85}
              sizes="(max-width: 1280px) 94vw, 1280px"
              className="device__photo"
            />
            <div className="device__ears" aria-hidden />
            <div className="device__face device__face--fallback">
              <div className="device__brand" aria-hidden>
                <Image
                  src="/quantex-chrome-mark-sm-v2.webp"
                  alt=""
                  width={96}
                  height={84}
                  className="device__mark"
                />
                <span>QUANTEX</span>
              </div>
              <Readout lines={DEVICES[0].lines} />
              <div className="device__controls" aria-hidden>
                <Knob />
                <Knob />
                <span className="device__led" />
                <span className="device__led device__led--dim" />
                <span className="device__led device__led--dim" />
              </div>
            </div>
            <div className="device__caption">
              <h3>{DEVICES[0].title}</h3>
              <p>{DEVICES[0].body}</p>
              <Link href={DEVICES[0].href} data-interactive className="device__link">
                Explore
                <span aria-hidden>→</span>
              </Link>
            </div>
          </article>

          {DEVICES.slice(1).map((device) => (
            <article key={device.href} className="device" data-reveal>
              <div className="device__face">
                <div className="device__brand device__brand--sm" aria-hidden>
                  <Image
                    src="/quantex-chrome-mark-sm-v2.webp"
                    alt=""
                    width={64}
                    height={56}
                    className="device__mark"
                  />
                  <span>QUANTEX</span>
                </div>
                <Readout lines={device.lines} />
              </div>
              <div className="device__caption">
                <h3>{device.title}</h3>
                <p>{device.body}</p>
                <Link href={device.href} data-interactive className="device__link">
                  Explore
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
