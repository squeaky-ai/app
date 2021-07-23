export interface Analytics {
  visitors: number;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
}

interface AnalyticsPage {
  path: string;
  count: number;
}