import { gql } from '@apollo/client';

export const GET_OVERVIEW_QUERY = gql`
  query GetOverview($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        visitors
        pageViews
        recordingsCount
      }
      recordings(page: 1, size: 1, sort: DATE_DESC) {
        items {
          id
          viewerId
          duration
          startPage
          exitPage
          pageCount
          pageViews
          connectedAt
          events(page: 1, size: 10) {
            items
          }
        }
      }
    }
  }
`;
