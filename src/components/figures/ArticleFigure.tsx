import { BrandLogo } from "@/components/layout/BrandLogo";
import { FIGURE_LABEL } from "@/lib/figures/data";
import type {
  FigureData,
  FlowFigure,
  FoundationFigure,
  Lang,
  PathFigure,
  SplitFigure,
  StackFigure,
  StairsFigure,
} from "@/lib/figures/types";

/**
 * Explainer diagrams in the Quantex look: brushed-aluminium plates, headline
 * type, square corners. They are real page text (not images), so they stay
 * sharp, searchable and theme-aware, and mirror correctly in Arabic.
 */

const pad = (n: number) => String(n).padStart(2, "0");

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span className={`qfig-arrow${down ? " qfig-arrow--down" : ""}`} aria-hidden>
      {down ? "↓" : "→"}
    </span>
  );
}

function Foundation({ d }: { d: FoundationFigure }) {
  return (
    <div className="qfig-foundation">
      <ul className="qfig-foundation__cols">
        {d.columns.map((c) => (
          <li key={c.name} className="qfig-node">
            <p className="qfig-display qfig-node__big">{c.name}</p>
            <p className="qfig-node__goal">{c.goal}</p>
            <dl className="qfig-node__facts">
              <dt>{d.winsLabel}</dt>
              <dd>{c.wins}</dd>
              <dt>{d.appearsLabel}</dt>
              <dd>{c.appears}</dd>
            </dl>
          </li>
        ))}
      </ul>
      <div className="qfig-node qfig-node--hero qfig-foundation__base">
        <p className="qfig-display qfig-node__t">{d.foundation.label}</p>
        <ul className="qfig-foundation__items">
          {d.foundation.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Path({ d }: { d: PathFigure }) {
  return (
    <div className="qfig-path">
      <ol className="qfig-path__steps">
        {d.steps.map((s, i) => (
          <li key={s.label} className="qfig-path__step">
            <div className="qfig-node">
              <span className="qfig-num">{pad(i + 1)}</span>
              <p className="qfig-display qfig-node__t">{s.label}</p>
              <p className="qfig-node__d">{s.detail}</p>
            </div>
            {i < d.steps.length - 1 ? <Arrow /> : null}
          </li>
        ))}
      </ol>
      <div className="qfig-node qfig-node--hero qfig-path__result">
        <Arrow />
        <p className="qfig-display qfig-node__t">{d.result}</p>
      </div>
    </div>
  );
}

function Stack({ d }: { d: StackFigure }) {
  const top = d.layers.length - 1;
  const ordered = [...d.layers].map((l, i) => ({ ...l, i })).reverse();
  return (
    <div className="qfig-stack">
      <p className="qfig-stack__hint" aria-hidden>
        <span>↑</span> {d.hint}
      </p>
      <ol className="qfig-stack__layers">
        {ordered.map((l, row) => (
          <li
            key={l.label}
            className={`qfig-node qfig-stack__layer${l.i === top ? " qfig-node--hero" : ""}`}
            data-row={row}
          >
            <span className="qfig-num">{pad(l.i + 1)}</span>
            <p className="qfig-display qfig-node__t">{l.label}</p>
            <p className="qfig-node__d">{l.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Stairs({ d }: { d: StairsFigure }) {
  return (
    <div className="qfig-stairs">
      <div className="qfig-stairs__tags">
        <p className="qfig-tag">{d.start}</p>
        <p className="qfig-tag">{d.end}</p>
      </div>
      <ol className="qfig-stairs__steps">
        {d.steps.map((s, i) => (
          <li
            key={s.label}
            className={`qfig-node qfig-stairs__step${i === d.steps.length - 1 ? " qfig-node--hero" : ""}`}
            style={{ ["--rise" as string]: i }}
          >
            <span className="qfig-num">{pad(i + 1)}</span>
            <p className="qfig-display qfig-node__t">{s.label}</p>
            <p className="qfig-node__d">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Flow({ d }: { d: FlowFigure }) {
  return (
    <div className="qfig-flow">
      <div className="qfig-flow__row">
        <div className="qfig-node qfig-flow__customer">
          <p className="qfig-label">{d.customer.label}</p>
          <p className="qfig-flow__bubble">{d.customer.message}</p>
        </div>
        <Arrow />
        <div className="qfig-node qfig-node--hero qfig-flow__assistant">
          <p className="qfig-display qfig-node__t">{d.assistant.label}</p>
          <p className="qfig-node__d">{d.assistant.detail}</p>
        </div>
        <Arrow />
        <div className="qfig-flow__outcomes">
          <div className="qfig-node qfig-node--ok">
            <p className="qfig-display qfig-node__t">{d.answered.label}</p>
            <p className="qfig-node__d">{d.answered.detail}</p>
          </div>
          <div className="qfig-node qfig-node--warn">
            <p className="qfig-display qfig-node__t">{d.handover.label}</p>
            <p className="qfig-node__d">{d.handover.detail}</p>
          </div>
        </div>
      </div>
      <p className="qfig-flow__loop">
        <span aria-hidden>↺</span> {d.loop}
      </p>
    </div>
  );
}

function Split({ d }: { d: SplitFigure }) {
  return (
    <div className="qfig-split">
      <div className="qfig-node qfig-split__side">
        <p className="qfig-display qfig-node__t">{d.left.label}</p>
        <ul className="qfig-split__list qfig-split__list--ok">
          {d.left.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="qfig-split__line" aria-hidden>
        <span>{d.line}</span>
      </div>
      <div className="qfig-node qfig-split__side">
        <p className="qfig-display qfig-node__t">{d.right.label}</p>
        <ul className="qfig-split__list qfig-split__list--warn">
          {d.right.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function renderBody(d: FigureData) {
  switch (d.kind) {
    case "foundation":
      return <Foundation d={d} />;
    case "path":
      return <Path d={d} />;
    case "stack":
      return <Stack d={d} />;
    case "stairs":
      return <Stairs d={d} />;
    case "flow":
      return <Flow d={d} />;
    case "split":
      return <Split d={d} />;
  }
}

export function ArticleFigure({ lang, data }: { lang: Lang; data: FigureData }) {
  return (
    <figure className="qfig">
      <header className="qfig__head">
        <div>
          <p className="qfig-label">{FIGURE_LABEL[lang]}</p>
          <p className="qfig-display qfig__title">{data.title}</p>
        </div>
        <BrandLogo variant="mark" className="h-6 w-auto opacity-80" />
      </header>
      <div className="qfig__body">{renderBody(data)}</div>
      <figcaption className="qfig__cap">{data.caption}</figcaption>
    </figure>
  );
}
