import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($site_id: ID!, $date_string: String!) { 
    site(id: $site_id) {
      id
      analytics(dateString: $date_string) {
        visitors
        pageViews
        averageSessionDuration
        pagesPerSession
        pages {
          path
          count
        }
      }
    }
  }
`;
