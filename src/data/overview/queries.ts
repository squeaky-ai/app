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
    }
  }
`;
