import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
        averageSessionDuration
        pagesPerSession
        visitorsCount {
          total
          new
        }
        visitors {
          new
          timestamp
        }
        pageViews {
          unique
          timestamp
        }
        pages {
          path
          count
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
        dimensions {
          min
          max
          avg
        }
        referrers {
          name
          count
        }
      }
    }
  }
`;
