import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $page: String!, $type: HeatmapsType!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $device: HeatmapsDevice!, $excludeRecordingIds: [ID!], $cluster: Int) {
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
          events(page: 1, size: 10) {
            items {
              id
              type
              data
              timestamp
            }
            pagination {
              perPage
              itemCount
              currentPage
              totalPages
            }
          }
        }
        items(cluster: $cluster) {
          ... on HeatmapsClickCount {
            selector
            count
          }
          ... on HeatmapsClickPosition {
            selector
            relativeToElementX
            relativeToElementY
          }
          ... on HeatmapsCursor {
            x
            y
            count
          }
          ... on HeatmapsScroll {
            x
            y
          }
        }
      }
    }
  }
`;
