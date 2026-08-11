import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";

const STAGES = [
  "DISCOVER",
  "EXTRACT",
  "NORMALIZE",
  "LINKGRAPH",
  "METRICS",
] as const;

const WORKERS = ["128/128", "256/256", "192/192", "160/160", "64/64"] as const;

function buildLogRows(seed: number) {
  const rows: string[] = [];
  for (let i = 0; i < 28; i++) {
    const stage = STAGES[i % STAGES.length];
    const workers = WORKERS[i % WORKERS.length];
    const sec = String((seed * 7 + i * 3) % 60).padStart(2, "0");
    const addr = `00007FA1C2B${(0x40000 + i * 0x180)
      .toString(16)
      .toUpperCase()
      .padStart(5, "0")}`;
    rows.push(
      `2025-05-20 14:37:${sec}  ${stage.padEnd(10)}  RUNNING  ${workers.padEnd(7)}  ${addr}`,
    );
  }
  return rows;
}

const COLUMNS = [0, 1, 2].map((col) => ({
  id: col,
  rows: buildLogRows(col + 1),
}));

export function HeroSection() {
  return (
    <section id="home" className="hero-crt" aria-labelledby="hero-heading">
      <div className="hero-crt__backdrop" aria-hidden>
        <div className="hero-crt__logs">
          {COLUMNS.map((column) => (
            <div key={column.id} className="hero-crt__log-col">
              <p className="hero-crt__log-head">
                PIPELINE::STAGE&nbsp;&nbsp;STATUS&nbsp;&nbsp;WORKERS&nbsp;&nbsp;ADDR
              </p>
              {column.rows.map((row) => (
                <p key={row}>{row}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="hero-crt__waves">
          <span className="hero-crt__wave hero-crt__wave--a" />
          <span className="hero-crt__wave hero-crt__wave--b" />
          <span className="hero-crt__wave hero-crt__wave--c" />
          <span className="hero-crt__wave hero-crt__wave--d" />
        </div>
      </div>

      <div className="hero-crt__content">
        <h1 id="hero-heading">Crawl. Index. Rank.</h1>
        <p className="hero-crt__support">
          Technical SEO, Core Web Vitals, and search visibility—engineered at
          the source.
        </p>
        <div className="hero-crt__ctas">
          <a
            href="/contact"
            data-interactive
            data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
            data-conversion-location="hero"
            className="hero-crt__btn hero-crt__btn--primary"
          >
            [ RUN_VISIBILITY_AUDIT ]
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-interactive
            data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
            data-conversion-location="hero"
            className="hero-crt__btn hero-crt__btn--ghost"
          >
            [ BOOK_STRATEGY_CALL ]
          </a>
        </div>
      </div>
    </section>
  );
}
