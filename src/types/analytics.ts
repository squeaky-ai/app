export interface Analytics {
  visitors: number;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
}

interface AnalyticsPage {
  path: string;
  count: number;
}

interface AnalyticsBrowser {
  name: string;
  count: number;
}
