import { ASK_UI } from "@/lib/visitor/ui";
import type { ProfileLocale } from "@/lib/visitor/profiles";

type SiteCheckCopy = { label: string; title: string; text: string; button: string };

const EN_COPY: SiteCheckCopy = {
  label: "Free tool · 20 seconds",
  title: "Can customers and AI find your website?",
  text: "Get a score for Google, AI search and mobile speed, with a fix list in plain words.",
  button: "Check it",
};

/** The free site check, usable from here: the address goes straight to the tool. */
export function SiteCheckBand({
  locale = "en",
  copy = EN_COPY,
}: {
  locale?: ProfileLocale;
  copy?: SiteCheckCopy;
}) {
  const ui = ASK_UI[locale];
  return (
    <section className="alu-section" aria-labelledby="site-check-band-heading">
      <div className="alu-section__inner">
        <div className="check-band" data-force-dark data-reveal>
          <div className="check-band__copy">
            <p className="page-label">{copy.label}</p>
            <h2 id="site-check-band-heading" className="alu-display check-band__title">
              {copy.title}
            </h2>
            <p className="check-band__text">
              {copy.text}
            </p>
            <form action="/site-check" method="get" className="ask-form check-band__form">
              <label htmlFor="check-band-url" className="sr-only">
                {ui.checkInput}
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
                dir="ltr"
                required
              />
              <button
                type="submit"
                data-interactive
                data-conversion="cta_click"
                data-conversion-location="site_check_band"
                className="btn-primary ask-form__submit"
              >
                {copy.button}
              </button>
            </form>
          </div>

          <figure className="check-band__sample" aria-hidden>
            <span className="mock-score__ring">
              <strong>86</strong>
            </span>
            <ul>
              <li>
                <span>{ui.checkSample[0]}</span>
                <i style={{ "--w": "88%" } as React.CSSProperties} />
              </li>
              <li>
                <span>{ui.checkSample[1]}</span>
                <i style={{ "--w": "64%" } as React.CSSProperties} />
              </li>
              <li>
                <span>{ui.checkSample[2]}</span>
                <i style={{ "--w": "92%" } as React.CSSProperties} />
              </li>
            </ul>
            <figcaption>{ui.checkSample[3]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
