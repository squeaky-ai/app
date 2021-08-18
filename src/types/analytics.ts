export interface Analytics {
  pageViewsRange: PageViewRange[];
  visitors: number;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
  languages: AnalyticsLanguage[];
  devices: AnalyticsDevice[];
  dimensions: AnalyticsDimensions;
  recordingsCount: number;
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
