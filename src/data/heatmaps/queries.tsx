import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $page: String!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $device: HeatmapsDevice!, $type: HeatmapsType!) { 
    site(siteId: $siteId) {
      id
      heatmaps(page: $page, device: $device, fromDate: $fromDate, toDate: $toDate, type: $type) {
        desktopCount
        tabletCount
        mobileCount
        recordingId
        items {
          x
          y
          selector
          count
        }
      }
    }
  }
`;

export const GET_RECORDING_QUERY = gql`
  query GetHeatmapsRecording($siteId: ID!, $recordingId: ID!) { 
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
          linkedData
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
