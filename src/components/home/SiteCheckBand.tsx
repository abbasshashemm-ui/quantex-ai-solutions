/** The free site check, usable from here: the address goes straight to the tool. */
export function SiteCheckBand() {
  return (
    <section className="alu-section" aria-labelledby="site-check-band-heading">
      <div className="alu-section__inner">
        <div className="check-band" data-force-dark data-reveal>
          <div className="check-band__copy">
            <p className="page-label">Free tool · 20 seconds</p>
            <h2 id="site-check-band-heading" className="alu-display check-band__title">
              Can customers and AI find your website?
            </h2>
            <p className="check-band__text">
              Get a score for Google, AI search and mobile speed, with a fix
              list in plain words.
            </p>
            <form action="/site-check" method="get" className="ask-form check-band__form">
              <label htmlFor="check-band-url" className="sr-only">
                Your website address
              </label>
              <input
                id="check-band-url"
                name="url"
                data-interactive
                className="ask-form__input"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={300}
                placeholder="yourwebsite.com"
                required
              />
              <button
                type="submit"
                data-interactive
                data-conversion="cta_click"
                data-conversion-location="site_check_band"
                className="btn-primary ask-form__submit"
              >
                Check it
              </button>
            </form>
          </div>

          <figure className="check-band__sample" aria-hidden>
            <span className="mock-score__ring">
              <strong>86</strong>
            </span>
            <ul>
              <li>
                <span>Google</span>
                <i style={{ "--w": "88%" } as React.CSSProperties} />
              </li>
              <li>
                <span>AI search</span>
                <i style={{ "--w": "64%" } as React.CSSProperties} />
              </li>
              <li>
                <span>Mobile speed</span>
                <i style={{ "--w": "92%" } as React.CSSProperties} />
              </li>
            </ul>
            <figcaption>Sample report</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
