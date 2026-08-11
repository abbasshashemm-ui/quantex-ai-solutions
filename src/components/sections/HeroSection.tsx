import { BrandLogo } from "@/components/layout/BrandLogo";
import { CONVERSION_EVENTS } from "@/lib/analytics/events";
import { CONTACT } from "@/lib/site/contact";
import {
  ASCII_WAVES,
  CRAWL_STATS,
  FRONTIER,
  FRONTIER_BAR,
  FRONTIER_IPS,
  HEX_DUMP,
  NODES,
  PIPELINE,
  textBar,
} from "@/lib/site/hero-data";

export function HeroSection() {
  return (
    <section id="home" className="hero-dash" aria-labelledby="hero-heading">
      <div className="hero-dash__frame">
        <header className="hero-dash__chrome">
          <p className="hero-dash__prompt">
            <span className="is-accent">root@quantex</span>
            :/crawl# ./index --depth=∞ --threads=256 --no-redirects --raw
            <span className="hero-dash__cursor" aria-hidden />
          </p>
          <pre className="hero-dash__ruler" aria-hidden>
            {`10····20····30····40····50····60····70····80····90···100···110···120···130`}
          </pre>
        </header>

        <div className="hero-dash__body">
          <aside className="hero-dash__side" aria-hidden>
            <section>
              <p className="hero-dash__label">CRAWL::FRONTIER</p>
              <ul className="hero-dash__kv">
                {FRONTIER.map((row) => (
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
              <p className="hero-dash__bar">
                {textBar(FRONTIER_BAR.filled, FRONTIER_BAR.total)}{" "}
                <span className="is-accent">{FRONTIER_BAR.value}</span>
              </p>
              <ul className="hero-dash__kv hero-dash__kv--tight">
                {FRONTIER_IPS.map((row) => (
                  <li key={row.ip}>
                    <span>{row.ip}</span>
                    <strong>{row.count}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="hero-dash__label">CRAWL::STATS</p>
              <ul className="hero-dash__kv">
                {CRAWL_STATS.map((row) => (
                  <li key={row.label}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="hero-dash__label">PIPELINE::STAGE</p>
              <ul className="hero-dash__kv">
                {PIPELINE.map((row) => (
                  <li key={row.n}>
                    <span>
                      {row.n} {row.name}
                    </span>
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

            <section className="hero-dash__hex-wrap">
              <p className="hero-dash__label">MEM::DUMP</p>
              <pre className="hero-dash__hex">{HEX_DUMP}</pre>
            </section>
          </aside>

          <div className="hero-dash__main">
            <div className="hero-dash__brand">
              <BrandLogo
                priority
                className="hero-dash__logo h-9 w-auto max-w-[min(260px,70vw)] sm:h-11 md:h-12"
              />
            </div>

            <div className="hero-dash__viewport">
              <pre className="hero-dash__ascii">{ASCII_WAVES}</pre>
              <span className="hero-dash__reticle hero-dash__reticle--a" />
              <span className="hero-dash__reticle hero-dash__reticle--b" />
              <span className="hero-dash__reticle hero-dash__reticle--c" />

              <div className="hero-dash__copy">
                <h1 id="hero-heading">Crawl. Index. Rank.</h1>
                <p>
                  Technical SEO, Core Web Vitals, and search visibility—engineered
                  at the source.
                </p>
                <div className="hero-dash__ctas">
                  <a
                    href="/contact"
                    data-interactive
                    data-conversion={CONVERSION_EVENTS.SOLUTIONS_CLICK}
                    data-conversion-location="hero"
                    className="hero-dash__btn hero-dash__btn--primary"
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
                    className="hero-dash__btn hero-dash__btn--ghost"
                  >
                    [ BOOK_STRATEGY_CALL ]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-dash__table-wrap" aria-hidden>
          <table className="hero-dash__table">
            <thead>
              <tr>
                <th>NODE</th>
                <th>DEGREE</th>
                <th>INLINKS</th>
                <th>OUTLINKS</th>
                <th>FIRST_SEEN</th>
                <th>LAST_SEEN</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {NODES.map((row) => (
                <tr key={row.node}>
                  <td>{row.node}</td>
                  <td>{row.degree}</td>
                  <td>{row.inlinks}</td>
                  <td>{row.outlinks}</td>
                  <td>{row.first}</td>
                  <td>{row.last}</td>
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
