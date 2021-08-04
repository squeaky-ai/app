export interface Analytics {
  viewsAndVisitorsPerHour: ViewAndVisitor[];
  visitors: number;
  pageViews: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  pages: AnalyticsPage[];
  browsers: AnalyticsBrowser[];
  languages: AnalyticsLanguage[];
  devices: AnalyticsDevice[];
  dimensions: AnalyticsDimensions;
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
