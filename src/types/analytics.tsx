import type { Analytics } from 'types/graphql';

export type AnalyticsTraffic = Pick<Analytics,
  'pageViewCount' |
  'visitsAt' |
  'sessionDurations' |
  'pagesPerSession' |
  'sessionsPerVisitor' |
  'visitorsCount' |
  'visitors' |
  'pageViews' |
  'pages'
>
