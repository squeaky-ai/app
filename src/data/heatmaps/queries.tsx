import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $type: HeatmapsType!, $page: String!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $device: HeatmapsDevice!, $excludeRecordingIds: [ID!]) {
    site(siteId: $siteId) {
      id
      heatmaps(page: $page, type: $type, device: $device, fromDate: $fromDate, toDate: $toDate, excludeRecordingIds: $excludeRecordingIds) {
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
          connectedAt {
            iso8601
            niceDateTime
          }
          disconnectedAt {
            iso8601
            niceDateTime
          }
          visitor {
            id
            visitorId
            starred
            linkedData
          }
          pages {
            url
            enteredAt {
              iso8601
              niceDateTime
            }
            exitedAt {
              iso8601
              niceDateTime
            }
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
        items
      }
    }
  }
`;
