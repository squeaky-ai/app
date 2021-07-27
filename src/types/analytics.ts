export interface Analytics {
  visitors: number;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
}

export interface AnalyticsPage {
  path: string;
  count: number;
}

export interface AnalyticsBrowser {
  name: string;
  count: number;
}
