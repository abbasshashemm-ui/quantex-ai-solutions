import { BrandLogo } from "@/components/layout/BrandLogo";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";
import {
  ASCII_LANDSCAPE,
  CRAWL_FRONTIER,
  CRAWL_STATS,
  HEX_DUMP,
  NODE_ROWS,
  PIPELINE_STAGES,
  SHARD_GRID,
  textBar,
} from "@/lib/site/ascii";

export function HeroSection() {
  return (
    <section id="home" className="hero-crt" aria-labelledby="hero-heading">
      <div className="hero-crt__shell">
        {/* Top chrome: prompt + coordinate ruler */}
        <header className="hero-crt__top">
          <p className="hero-crt__prompt">
            <span className="hero-crt__prompt-user">root@quantex</span>
            <span className="hero-crt__prompt-path">:/crawl#</span>{" "}
            <span className="hero-crt__prompt-cmd">
              ./index --depth=∞ --threads=256 --no-redirects --raw
            </span>
            <span className="hero-blink" aria-hidden />
          </p>
          <pre className="hero-crt__ruler" aria-hidden>
            {`10····20····30····40····50····60····70····80····90···100···110···120···130`}
          </pre>
        </header>

        <div className="hero-crt__grid">
          {/* Left telemetry column */}
          <aside className="hero-crt__side" aria-hidden>
            <section className="hero-crt__block">
              <p className="hero-crt__label">CRAWL::FRONTIER</p>
              <ul className="hero-crt__kv">
                {CRAWL_FRONTIER.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <span>
                      {" > "}
                      <em className={row.accent ? "is-accent" : undefined}>
                        {row.value}
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="hero-crt__block">
              <p className="hero-crt__label">CRAWL::STATS</p>
              <ul className="hero-crt__bars">
                {CRAWL_STATS.map((stat) => (
                  <li key={stat.label}>
                    <span className="hero-crt__bar-label">{stat.label}</span>
                    <span className="hero-crt__bar-track">
                      {textBar(stat.filled, stat.total)}
                    </span>
                    <span className="is-accent">{stat.value}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="hero-crt__block">
              <p className="hero-crt__label">PIPELINE::STAGE</p>
              <ul className="hero-crt__kv">
                {PIPELINE_STAGES.map((row) => (
                  <li key={row.stage}>
                    <span>{row.stage.trimEnd()}</span>
                    <span>
                      {" > "}
                      <em
                        className={
                          row.status === "QUEUED" ? "is-muted" : "is-accent"
                        }
                      >
                        {row.status}
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="hero-crt__block">
              <p className="hero-crt__label">SHARDS</p>
              <pre className="hero-crt__shards">{SHARD_GRID.join("\n")}</pre>
            </section>

            <section className="hero-crt__block hero-crt__block--hex">
              <p className="hero-crt__label">MEM::DUMP</p>
              <pre className="hero-crt__hex">{HEX_DUMP}</pre>
            </section>
          </aside>

          {/* Main viewport: ASCII landscape is the dominant plane */}
          <div className="hero-crt__main">
            <div className="hero-crt__viewport">
              <pre className="hero-crt__ascii">{ASCII_LANDSCAPE}</pre>
              <div className="hero-crt__scan" aria-hidden />
              <div className="hero-crt__glitch" aria-hidden />
              <span className="hero-crt__reticle hero-crt__reticle--a" aria-hidden />
              <span className="hero-crt__reticle hero-crt__reticle--b" aria-hidden />
              <span className="hero-crt__reticle hero-crt__reticle--c" aria-hidden />

              <div className="hero-crt__copy">
                <BrandLogo
                  priority
                  className="hero-crt__logo h-10 w-auto max-w-[min(280px,72vw)] sm:h-12 md:h-14"
                />
                <h1 id="hero-heading">Crawl. Index. Rank.</h1>
                <p className="hero-crt__support">
                  Technical SEO, Core Web Vitals, and search visibility—engineered
                  at the source.
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
            </div>
          </div>
        </div>

        {/* Bottom node table */}
        <div className="hero-crt__table-wrap" aria-hidden>
          <table className="hero-crt__table">
            <thead>
              <tr>
                <th>ADDR</th>
                <th>DEGREE</th>
                <th>INLINKS</th>
                <th>FIRST_SEEN</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {NODE_ROWS.map((row) => (
                <tr key={row.addr}>
                  <td>{row.addr}</td>
                  <td>{row.degree}</td>
                  <td>{row.inlinks}</td>
                  <td>{row.firstSeen}</td>
                  <td className="is-accent">&gt; {row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
