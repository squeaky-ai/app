import { gql } from '@apollo/client';

export const GET_NPS_QUERY = gql`
  query GetNPS($siteId: ID!, $page: Int!, $size: Int!, $sort: NpsResponseSort!, $fromDate: String!, $toDate: String!) {
    site(siteId: $siteId) {
      id
      nps(fromDate: $fromDate, toDate: $toDate) {
        responses(page: $page, size: $size, sort: $sort) {
          items {
            id
            score
            comment
            contact
            visitor {
              id
              visitorId
            }
            sessionId
            recordingId
            timestamp
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
            timestamp
          }
        }
      }
    }
  }
`;
