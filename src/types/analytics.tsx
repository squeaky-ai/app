import type { Analytics, AnalyticsPerPage } from 'types/graphql';

export type AnalyticsTraffic = Pick<Analytics,
  'visitsAt' |
  'sessionDurations' |
  'pagesPerSession' |
  'sessionsPerVisitor' |
  'visitorsCount' |
  'visitors' |
  'pageViews' |
  'pages'
>

export type AnalyticsAudience = Pick<Analytics,
  'dimensions' |
  'browsers' |
  'languages' |
  'countries' |
  'devices' |
  'referrers' |
  'visitors'
>

export type AnalyticsPageTraffic = Pick<AnalyticsPerPage,
  'averageTimeOnPage' |
  'averageVisitsPerSession' |
  'bounceRate' |
  'exitRate' |
  'pageViews' |
  'visitsAt'
>

export type AnalyticsPageAudience = Pick<AnalyticsPerPage,
  'languages' | 
  'countries' |
  'browsers' |
  'dimensions' |
  'devices' |
  'referrers'
>
