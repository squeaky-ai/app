import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $dateString: String!) { 
    site(siteId: $siteId) {
      id
      analytics(dateString: $dateString) {
        viewsAndVisitorsPerHour {
          hour
          pageViews
          visitors
        }
        visitors
        pageViews
        averageSessionDuration
        pagesPerSession
        pages {
          path
          count
        }
        browsers {
          name
          count
        }
      }
    }
  }
`;
