import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
        dimensions
        sessionDurations {
          average
          trend
        }
        pagesPerSession {
          average
          trend
        }
        sessionsPerVisitor {
          average
          trend
        }
        visitorsCount {
          total
          new
        }
        visitors {
          new
          timestamp
        }
        pageViews {
          total
          unique
          timestamp
        }
        pages {
          path
          count
          avg
        }
        browsers  {
          name
          count
        }
        languages {
          name
          count
        }
        devices {
          type
          count
        }
        referrers {
          name
          count
        }
      }
    }
  }
`;
