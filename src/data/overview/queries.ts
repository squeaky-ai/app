import { gql } from '@apollo/client';

export const GET_OVERVIEW_QUERY = gql`
  query GetOverview($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViews
        visitorsCount {
          total
          new
        }
        recordingsCount {
          total
          new
        }
      }
      notes(page: 1, size: 5) {
        items {
          id
          timestamp
          body
          recordingId
          sessionId
          user {
            fullName
          }
        }
      }
      recordings(page: 1, size: 1, sort: DATE_DESC) {
        items {
          id
          duration
          startPage
          exitPage
          pageCount
          pageViews
          connectedAt
          device {
            viewportX
            viewportY
          }
          visitor {
            id
            visitorId
            starred
          }
          events(page: 1, size: 10) {
            items
          }
        }
      }
    }
  }
`;
