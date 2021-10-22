import { gql } from '@apollo/client';

export const GET_OVERVIEW_QUERY = gql`
  query GetOverview($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      activeVisitorCount
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
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
      recordingLatest {
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
`;
