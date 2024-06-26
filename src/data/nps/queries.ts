import { gql } from '@apollo/client';

export const GET_NPS_QUERY = gql`
  query GetNPS(
    $siteId: ID!,
    $page: Int!,
    $size: Int!,
    $filters: FeedbackNpsResponseFilters,
    $sort: FeedbackNpsResponseSort!,
    $fromDate: ISO8601Date!,
    $toDate: ISO8601Date!
  ) {
    site(siteId: $siteId) {
      id
      nps(fromDate: $fromDate, toDate: $toDate) {
        responses(page: $page, size: $size, sort: $sort, filters: $filters) {
          items {
            id
            score
            comment
            contact
            email
            visitor {
              id
              visitorId
            }
            device {
              viewportX
              viewportY
              browserName
              browserDetails
              deviceType
            }
            sessionId
            recordingId
            timestamp {
              iso8601
              niceDateTime
            }
          }
          pagination {
            pageSize
            total
            sort
          }
        }
        groups {
          promoters
          passives
          detractors
        }
        stats {
          displays
          ratings
        }
        ratings {
          score
        }
        replies {
          trend
          responses {
            score
            timestamp {
              iso8601
              niceDateTime
            }
          }
        }
        scores {
          trend
          score
          responses {
            score
            timestamp {
              iso8601
              niceDateTime
            }
          }
        }
      }
    }
  }
`;
