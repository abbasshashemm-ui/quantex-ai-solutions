import type { ReactNode } from "react";
import { MOCK_COPY, type MockCopy, type MockKind } from "@/lib/services/mocks";

type ServiceMockProps = {
  kind: MockKind;
  locale?: "en" | "ar" | "fr";
};

function Shell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="work-frame mock">
      <div className="work-frame__bar" aria-hidden>
        <span className="work-frame__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="work-frame__address">{title}</span>
      </div>
      <div className="mock__body">{children}</div>
    </div>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden>
      <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AssistantMock({ c }: { c: MockCopy["assistant"] }) {
  return (
    <Shell title={c.frame}>
      <div className="mock-split">
        <div className="mock-chat">
          <p className="mock-chat__head">
            <span className="mock-avatar" />
            <span>
              <strong>{c.name}</strong>
              <small>
                <i className="mock-dot" /> {c.status}
              </small>
            </span>
          </p>
          <div className="mock-chat__thread">
            {c.messages.map((message) => (
              <span key={message.text} className={`offer-bubble${message.from === "out" ? " offer-bubble--out" : ""}`}>
                {message.text}
              </span>
            ))}
            <span className="mock-handover">{c.handover}</span>
          </div>
        </div>
        <div className="mock-side">
          <p className="mock-label">{c.knowsTitle}</p>
          <ul className="mock-list">
            {c.knows.map((item) => (
              <li key={item}>
                <span className="mock-tick">
                  <Tick />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mock-label mock-label--spaced">{c.handoverTitle}</p>
          <p className="mock-note">{c.handoverText}</p>
        </div>
      </div>
    </Shell>
  );
}

function AutomationMock({ c }: { c: MockCopy["automation"] }) {
  return (
    <Shell title={c.frame}>
      <div className="mock-split">
        <div className="mock-flow">
          <div className="mock-flow__trigger">
            <span className="mock-label">{c.triggerLabel}</span>
            <strong>{c.trigger}</strong>
          </div>
          <ol className="mock-flow__steps">
            {c.steps.map((step, index) => (
              <li key={step}>
                <span className="mock-flow__n">{index + 1}</span>
                <span className="mock-flow__text">{step}</span>
                <span className="mock-flow__done">
                  <Tick /> {c.done}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mock-side">
          <p className="mock-label">{c.logTitle}</p>
          <ul className="mock-log">
            {c.log.map((row) => (
              <li key={row.time}>
                <time dir="ltr">{row.time}</time>
                <span>{row.text}</span>
              </li>
            ))}
          </ul>
          <p className="mock-callout">{c.saved}</p>
        </div>
      </div>
    </Shell>
  );
}

const TREND = [34, 38, 45, 43, 56, 64, 71, 86];

function SeoMock({ c }: { c: MockCopy["seo"] }) {
  return (
    <Shell title={c.frame}>
      <div className="mock-split">
        <div className="mock-seo">
          <div className="mock-seo__top">
            <div className="mock-score">
              <span className="mock-score__ring">
                <strong dir="ltr">{c.score}</strong>
              </span>
              <span className="mock-label">{c.scoreLabel}</span>
            </div>
            <div className="mock-trend">
              <div className="mock-trend__bars" aria-hidden>
                {TREND.map((value, index) => (
                  <i key={index} style={{ height: `${value}%` }} />
                ))}
              </div>
              <span className="mock-label">{c.trendLabel}</span>
            </div>
          </div>
          <p className="mock-label mock-label--spaced">{c.tableTitle}</p>
          <ul className="mock-table">
            {c.rows.map((row) => (
              <li key={row.keyword}>
                <span>{row.keyword}</span>
                <strong dir="ltr">#{row.position}</strong>
                <em dir="ltr">▲ {row.change.replace("+", "")}</em>
              </li>
            ))}
          </ul>
        </div>
        <div className="mock-side">
          <p className="mock-label">{c.aiTitle}</p>
          <ul className="mock-ai">
            {c.ai.map((engine) => (
              <li key={engine.name}>
                <strong dir="ltr">{engine.name}</strong>
                <span className={engine.mentioned ? "mock-pill mock-pill--on" : "mock-pill"}>
                  {engine.mentioned ? c.mentioned : c.notYet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}

function SystemMock({ c }: { c: MockCopy["system"] }) {
  return (
    <Shell title={c.frame}>
      <div className="mock-system">
        <p className="mock-label">{c.channelsLabel}</p>
        <ul className="mock-nodes">
          {c.channels.map((node) => (
            <li key={node}>{node}</li>
          ))}
        </ul>
        <div className="mock-core">
          <strong>{c.core}</strong>
          <span>{c.coreNote}</span>
        </div>
        <ul className="mock-nodes mock-nodes--below">
          {c.services.map((node) => (
            <li key={node}>{node}</li>
          ))}
        </ul>
        <p className="mock-label">{c.servicesLabel}</p>
        <div className="mock-phases">
          <p className="mock-label">{c.phasesTitle}</p>
          <ol>
            {c.phases.map((phase, index) => (
              <li key={phase}>
                <span>{index + 1}</span>
                {phase}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Shell>
  );
}

/** A drawn interface with sample data, labelled as an illustration. */
export function ServiceMock({ kind, locale = "en" }: ServiceMockProps) {
  const copy = MOCK_COPY[locale];

  return (
    <section className="mt-14 sm:mt-20" aria-labelledby="service-mock">
      <h2 id="service-mock" className="alu-display text-[1.9rem] sm:text-[2.4rem]">
        {copy.heading}
      </h2>
      <p className="page-label mt-3">{copy.label}</p>
      <div className="mock-wrap" role="img" aria-label={`${copy.label}: ${copy[kind].frame}`}>
        {kind === "assistant" ? <AssistantMock c={copy.assistant} /> : null}
        {kind === "automation" ? <AutomationMock c={copy.automation} /> : null}
        {kind === "seo" ? <SeoMock c={copy.seo} /> : null}
        {kind === "system" ? <SystemMock c={copy.system} /> : null}
      </div>
    </section>
  );
}
