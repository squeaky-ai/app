export interface Analytics {
  pageViewsRange: PageViewRange[];
  visitorsCount: AnalyticsVisitors;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
  languages: AnalyticsLanguage[];
  devices: AnalyticsDevice[];
  dimensions: AnalyticsDimensions;
  recordingsCount: RecordingsVisitors;
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
