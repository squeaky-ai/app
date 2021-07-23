import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($site_id: ID!) { 
    site(id: $site_id) {
      id
      analytics {
        visitors
        pageViews
        averageSessionDuration
        pagesPerSession
      }
    }
  }
`;
