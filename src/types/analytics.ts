export interface Analytics {
  visitors: Visitor[];
  pageViews: PageView[];
  visitorsCount: AnalyticsVisitors;
  pageViewCount: number;
  sessionDurations: SessionDuration;
  pagesPerSession: PagesPerSession;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
  languages: AnalyticsLanguage[];
  devices: AnalyticsDevice[];
  dimensions: number[];
  recordingsCount: RecordingsVisitors;
  referrers: AnalyticsReferrer[];
  sessionsPerVisitor: SessionsPerVisitor;
}

export interface AnalyticsVisitors {
  total: number;
  new: number;
}

export interface RecordingsVisitors {
  total: number;
  new: number;
}

export interface PageViewRange {
  date: string;
  pageViewCount: number;
}

export interface AnalyticsPage {
  path: string;
  count: number;
  avg: number;
}

export interface AnalyticsBrowser {
  name: string;
  count: number;
}

export interface AnalyticsLanguage {
  name: string;
  count: number;
}

export interface AnalyticsDevice {
  type: string;
  count: number;
}

export interface AnalyticsReferrer {
  name: string;
  count: number;
}

export interface Visitor {
  new: boolean;
  timestamp: string;
}

export interface PageView {
  total: number;
  unique: number;
  timestamp: string;
}

export interface SessionDuration {
  average: string;
  trend: string;
}

export interface SessionsPerVisitor {
  average: number;
  trend: number;
}

export interface PagesPerSession {
  average: number;
  trend: number;
}
