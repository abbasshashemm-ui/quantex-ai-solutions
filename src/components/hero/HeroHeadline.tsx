import { Fragment, type CSSProperties, type ReactNode } from "react";

type HeroHeadlineProps = {
  /** The headline, one entry per word or phrase. The last entry is the punch line. */
  lines: readonly string[];
};

/**
 * The hero headline as a two-tier lockup: every line but the last runs
 * together in a light, upright weight, and the last line sits below it at
 * the same size, bold and italic.
 */
export function HeroHeadline({ lines }: HeroHeadlineProps) {
  const light = lines.slice(0, -1);
  const strong = lines[lines.length - 1];

  return (
    <h1 className="alu-h1">
      {light.length > 0 ? (
        <span className="alu-h1__light">
          {light.map((line, index) => (
            <Fragment key={line}>
              {index > 0 ? " " : null}
              <span
                className="alu-h1__line"
                style={{ "--i": index } as CSSProperties}
              >
                {line}
              </span>
            </Fragment>
          ))}
        </span>
      ) : null}
      <span
        className="alu-h1__line alu-h1__strong"
        style={{ "--i": light.length } as CSSProperties}
      >
        {strong}
      </span>
    </h1>
  );
}

type HeroFactsProps = {
  /** Short label for the row, e.g. "Studio". */
  label: ReactNode;
  /** Accessible name for the list. */
  ariaLabel: string;
  items: readonly string[];
};

/** A row of proof points pinned to the foot of the hero stage. */
export function HeroFacts({ label, ariaLabel, items }: HeroFactsProps) {
  return (
    <div className="alu-facts alu-stage__foot">
      <p className="alu-facts__label">{label}</p>
      <ul className="alu-facts__list" aria-label={ariaLabel}>
        {items.map((item) => (
          <li key={item} className="alu-facts__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
