import { gql } from '@apollo/client';

export const GET_DASHBOARD_QUERY = gql`
  query GetDashboard($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
        visitsAt
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
          deviceX
          deviceY
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
