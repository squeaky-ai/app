export interface Analytics {
  viewsAndVisitorsPerHour: ViewAndVisitor[];
  visitors: number;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
}

export interface ViewAndVisitor {
  hour: number;
  pageViews: number;
  visitors: number;
}

export interface AnalyticsPage {
  path: string;
  count: number;
}

export interface AnalyticsBrowser {
  name: string;
  count: number;
}
