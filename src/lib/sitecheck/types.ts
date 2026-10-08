export type CheckStatus = "pass" | "warn" | "fail";
export type CheckGroup = "search" | "ai" | "trust";

export type CheckResult = {
  id: string;
  group: CheckGroup;
  label: string;
  status: CheckStatus;
  detail: string;
  fix?: string;
  next?: string;
};

export type SiteCheckReport = {
  url: string;
  finalUrl: string;
  score: number;
  groups: Record<CheckGroup, number>;
  checks: CheckResult[];
};

export type SpeedReport = {
  score: number | null;
  lcp: string | null;
  cls: string | null;
  tbt: string | null;
  error?: string;
};
