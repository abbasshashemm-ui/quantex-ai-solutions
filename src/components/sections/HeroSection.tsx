import { HeroChat } from "@/components/chat/HeroChat";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";
import {
  ASCII_LANDSCAPE,
  CRAWL_FRONTIER,
  CRAWL_STATS,
  HEX_DUMP,
  NODE_ROWS,
  PIPELINE_STAGES,
  QUANTEX_ASCII,
  QUANTEX_ASCII_COMPACT,
} from "@/lib/site/ascii";

function ProgressBar({ label, bar, value }: { label: string; bar: number; value: string }) {
  return (
    <div className="crawl-bar" aria-hidden>
      <span>{label}</span>
      <div className="crawl-bar__track">
        <div className="crawl-bar__fill" style={{ width: `${bar}%` }} />
      </div>
      <span>{value}</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="hero-terminal" aria-labelledby="hero-heading">
      <div className="hero-terminal__frame">
        <div className="hero-terminal__chrome">
          <p className="hero-terminal__prompt hero-blink">
            root@quantex:/crawl#{" "}
            <span className="hero-terminal__prompt-args">
              ./index --depth=∞ --threads=256 --no-redirects --raw
            </span>
          </p>
          <p className="hero-terminal__ruler" aria-hidden>
            10····20····30····40····50····60····70····80····90···100···110···120
          </p>
        </div>

        <div className="hero-terminal__body">
          <aside className="hero-terminal__sidebar" aria-hidden>
            <div>
              <p className="hero-panel__title">CRAWL::FRONTIER</p>
              {CRAWL_FRONTIER.map((row) => (
                <div key={row.label} className="hero-panel__row">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>

            <div>
              <p className="hero-panel__title">CRAWL::STATS</p>
              {CRAWL_STATS.map((stat) => (
                <ProgressBar
                  key={stat.label}
                  label={stat.label}
                  bar={stat.bar}
                  value={stat.value}
                />
              ))}
            </div>

            <div>
              <p className="hero-panel__title">PIPELINE::STAGE</p>
              {PIPELINE_STAGES.map((row) => (
                <div key={row.stage} className="hero-panel__row">
                  <span>{row.stage}</span>
                  <strong
                    className={
                      row.status === "QUEUED"
                        ? "pipeline-status pipeline-status--queued"
                        : "pipeline-status"
                    }
                  >
                    &gt; {row.status}
                  </strong>
                </div>
              ))}
            </div>

            <pre className="hero-hex">{HEX_DUMP}</pre>
          </aside>

          <div className="hero-terminal__main">
            <pre className="hero-brand-ascii hero-brand-ascii--compact" aria-hidden>
              {QUANTEX_ASCII_COMPACT}
            </pre>
            <pre className="hero-brand-ascii hero-brand-ascii--full" aria-hidden>
              {QUANTEX_ASCII}
            </pre>
            <p className="sr-only">QUANTEX</p>

            <div className="hero-copy">
              <h1 id="hero-heading">Crawl. Index. Rank.</h1>
              <p>
                Technical SEO, Core Web Vitals, and search visibility—engineered
                at the source.
              </p>
              <div className="hero-ctas">
                <a
                  href="/contact"
                  data-interactive
                  data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
                  data-conversion-location="hero"
                  className="btn-primary"
                >
                  Run a visibility audit
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive
                  data-conversion={CONVERSION_EVENTS.WHATSAPP_CLICK}
                  data-conversion-location="hero"
                  className="btn-secondary"
                >
                  Book strategy call
                </a>
              </div>
            </div>

            <div className="ascii-landscape-wrap" aria-hidden>
              <pre className="ascii-landscape">{ASCII_LANDSCAPE}</pre>
              <span className="ascii-reticle ascii-reticle--a" />
              <span className="ascii-reticle ascii-reticle--b" />
            </div>
          </div>

          <HeroChat />
        </div>

        <div className="hero-terminal__table" aria-hidden>
          <table>
            <thead>
              <tr>
                <th>NODE</th>
                <th>DEGREE</th>
                <th>INLINKS</th>
                <th>FIRST_SEEN</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {NODE_ROWS.map((row) => (
                <tr key={row.node}>
                  <td>{row.node}</td>
                  <td>{row.degree}</td>
                  <td>{row.inlinks}</td>
                  <td>{row.firstSeen}</td>
                  <td className="ok">&gt; {row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
