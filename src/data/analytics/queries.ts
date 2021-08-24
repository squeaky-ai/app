import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViews
        averageSessionDuration
        pagesPerSession
        visitorsCount {
          total
          new
        }
        pageViewsRange {
          date
          pageViewCount
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
      }
    }
  }
`;
