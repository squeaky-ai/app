import { gql } from '@apollo/client';

export const GET_JOURNEYS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $page: String!, $position: PathPosition!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        userPaths(page: $page, position: $position) {
          path
        }
      }
    }
  }
`;
