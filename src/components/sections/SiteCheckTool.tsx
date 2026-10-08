"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/site/contact";
import type {
  CheckGroup,
  CheckResult,
  SiteCheckReport,
  SpeedReport,
} from "@/lib/sitecheck/types";

const GROUP_LABEL: Record<CheckGroup, string> = {
  search: "Google search basics",
  ai: "AI search readiness",
  trust: "Trust and technical",
};

const STATUS_LABEL = { pass: "Good", warn: "Improve", fail: "Fix" } as const;
const STATUS_CLASS = {
  pass: "text-signal",
  warn: "text-[var(--status-warn)]",
  fail: "text-red-600",
} as const;

function verdict(score: number): string {
  if (score >= 85) return "Strong. A few details left to polish.";
  if (score >= 60) return "Decent foundation, but customers and AI assistants are still missing you.";
  if (score >= 35) return "Your site is hard to find. The fixes below are the fastest wins.";
  return "Search engines and AI assistants can barely see this site. Good news: it is fixable.";
}

function ScoreBlock({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="alu-glass page-panel">
      <p className="page-label">{label}</p>
      <p className="alu-display mt-2 text-[3rem] leading-none">
        {value === null ? "-" : value}
        <span className="ml-1 text-base normal-case text-foreground/60">/100</span>
      </p>
    </div>
  );
}

export function SiteCheckTool() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<SiteCheckReport | null>(null);
  const [speed, setSpeed] = useState<SpeedReport | "loading" | null>(null);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setReport(null);
    setSpeed("loading");
    const body = JSON.stringify({ url });
    const headers = { "Content-Type": "application/json" };

    fetch("/api/site-check/speed", { method: "POST", headers, body })
      .then((r) => r.json())
      .then((data: Partial<SpeedReport> & { error?: string }) =>
        setSpeed({
          score: data.score ?? null,
          lcp: data.lcp ?? null,
          cls: data.cls ?? null,
          tbt: data.tbt ?? null,
          error: data.error,
        }),
      )
      .catch(() =>
        setSpeed({ score: null, lcp: null, cls: null, tbt: null, error: "Speed test unavailable." }),
      );

    try {
      const res = await fetch("/api/site-check", { method: "POST", headers, body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSpeed(null);
      } else {
        setReport(data as SiteCheckReport);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSpeed(null);
    } finally {
      setBusy(false);
    }
  }

  const failing = report?.checks.filter((c) => c.status !== "pass") ?? [];
  const whatsapp = report
    ? `${CONTACT.whatsapp}?text=${encodeURIComponent(
        `Hi QUANTEX, I ran the free site check on ${report.finalUrl} (score ${report.score}/100). Can you help me fix it?`,
      )}`
    : CONTACT.whatsapp;

  return (
    <div>
      <form onSubmit={onSubmit} className="alu-glass page-panel sm:p-8" noValidate>
        <label htmlFor="site-url" className="page-label">
          Your website address
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="site-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            maxLength={300}
            className="block w-full rounded-xl border border-line-strong bg-surface-elevated/70 px-3.5 py-3 text-base text-foreground outline-none transition placeholder:text-foreground/55 focus:border-foreground"
          />
          <button type="submit" disabled={busy} data-interactive className="btn-primary sm:w-auto sm:shrink-0">
            {busy ? "Checking…" : "Check my site"}
          </button>
        </div>
        <p className="mt-3 text-sm text-foreground/70">
          Free, takes about 20 seconds. We read your home page the way Google and AI assistants do.
        </p>
        {error ? (
          <p role="alert" className="mt-4 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}
      </form>

      <div aria-live="polite">
        {busy && !report ? (
          <p className="mt-8 text-base text-foreground/80">Reading your site…</p>
        ) : null}

        {report ? (
          <div className="mt-10">
            <p className="page-label">Report for {report.finalUrl}</p>
            <h2 className="alu-display mt-2 text-[2.4rem] sm:text-[3rem]">
              Visibility score: {report.score}/100
            </h2>
            <p className="mt-2 max-w-2xl text-base text-foreground/85">{verdict(report.score)}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ScoreBlock label={GROUP_LABEL.search} value={report.groups.search} />
              <ScoreBlock label={GROUP_LABEL.ai} value={report.groups.ai} />
              <ScoreBlock label={GROUP_LABEL.trust} value={report.groups.trust} />
              <div className="alu-glass page-panel">
                <p className="page-label">Mobile speed</p>
                {speed === "loading" || speed === null ? (
                  <p className="mt-3 text-sm text-foreground/70">Testing speed, up to 30 seconds…</p>
                ) : speed.score === null ? (
                  <p className="mt-3 text-sm text-foreground/70">{speed.error ?? "Unavailable."}</p>
                ) : (
                  <>
                    <p className="alu-display mt-2 text-[3rem] leading-none">
                      {speed.score}
                      <span className="ml-1 text-base normal-case text-foreground/60">/100</span>
                    </p>
                    <p className="mt-2 text-xs text-foreground/70">
                      Load {speed.lcp ?? "n/a"} · Blocking {speed.tbt ?? "n/a"} · Shift {speed.cls ?? "n/a"}
                    </p>
                  </>
                )}
              </div>
            </div>

            {(["search", "ai", "trust"] as CheckGroup[]).map((group) => (
              <section key={group} className="mt-10">
                <h3 className="alu-display text-[1.9rem]">{GROUP_LABEL[group]}</h3>
                <ul className="mt-4 grid gap-3">
                  {report.checks
                    .filter((c: CheckResult) => c.group === group)
                    .map((c) => (
                      <li key={c.id} className="alu-glass page-panel">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-base font-semibold text-foreground">{c.label}</p>
                          <p className={`text-xs font-bold tracking-[0.14em] uppercase ${STATUS_CLASS[c.status]}`}>
                            {STATUS_LABEL[c.status]}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-foreground/80">{c.detail}</p>
                        {c.fix ? (
                          <p className="mt-2 text-sm text-foreground/90">
                            <strong className="font-semibold">How to fix: </strong>
                            {c.fix}
                          </p>
                        ) : null}
                      </li>
                    ))}
                </ul>
              </section>
            ))}

            <div className="alu-glass mt-12 px-5 py-10 text-center sm:px-10 sm:py-14">
              <h3 className="alu-display mx-auto max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)]">
                {failing.length > 0
                  ? `${failing.length} thing${failing.length === 1 ? "" : "s"} to fix. Want us to do it?`
                  : "Looking good. Want to go further?"}
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-base text-foreground/80">
                We build and fix sites to rank on Google and get recommended by AI assistants.
                Send us this report and we reply within 24 hours with a plan and a price.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-interactive className="btn-primary w-full max-w-xs sm:w-auto">
                  Send this report on WhatsApp
                </a>
                <Link href="/pricing" data-interactive className="btn-secondary w-full max-w-xs sm:w-auto">
                  See pricing
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
