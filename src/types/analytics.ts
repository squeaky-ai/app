export interface Analytics {
  visitors: Visitor[];
  pageViews: PageView[];
  visitorsCount: AnalyticsVisitors;
  pageViewCount: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
  languages: AnalyticsLanguage[];
  devices: AnalyticsDevice[];
  dimensions: AnalyticsDimensions;
  recordingsCount: RecordingsVisitors;
  referrers: AnalyticsReferrer[];
  averageSessionsPerVisitor: number;
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

export interface AnalyticsDimensions {
  min: number;
  max: number;
  avg: number;
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
