import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $page: String!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $device: HeatmapsDevice!, $excludeRecordingIds: [ID!]) {
    site(siteId: $siteId) {
      id
      heatmaps(page: $page, device: $device, fromDate: $fromDate, toDate: $toDate, excludeRecordingIds: $excludeRecordingIds) {
        counts {
          desktop
          tablet
          mobile
        }
        recording {
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
          events(page: 1) {
            items {
              id
              type
              data
              timestamp
            }
            pagination {
              currentPage
              totalPages
            }
          }
        }
      }
    }
  }
`;
