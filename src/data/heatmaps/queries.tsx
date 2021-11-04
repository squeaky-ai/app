import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $page: String!, $fromDate: String!, $toDate: String!, $device: HeatmapsDevice!, $type: HeatmapsType!) { 
    site(siteId: $siteId) {
      id
      heatmaps(page: $page, device: $device, fromDate: $fromDate, toDate: $toDate, type: $type) {
        desktopCount
        mobileCount
        recordingId
        items {
          x
          y
          selector
        }
      }
    }
  }
`;

export const GET_RECORDING_QUERY = gql`
  query GetRecording($siteId: ID!, $recordingId: ID!) { 
    site(siteId: $siteId) {
      id
      recording(recordingId: $recordingId) {
        id
        device {
          viewportX
          viewportY
        }
        connectedAt
        disconnectedAt
        visitor {
          id
          visitorId
          starred
          attributes
        }
        pages {
          url
          enteredAt
          exitedAt
        }
        events(size: 500) {
          items
          pagination {
            perPage
            itemCount
            currentPage
            totalPages
          }
        }
      }
    }
  }
`;
