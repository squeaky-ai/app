import { gql } from '@apollo/client';

export const GET_EVENT_CAPTURES_QUERY = gql`
  query GetEventCapture($siteId: ID!, $page: Int, $size: Int, $sort: EventsCaptureSort) {
    site(siteId: $siteId) {
      id
      name
      eventCapture(page: $page, size: $size, sort: $sort) {
        items {
          id
          name
          type
          rules {
            matcher
            condition
            value
          }
          count
          groupNames
          lastCountedAt
        }
        pagination {
          pageSize
          total
          sort
        }
      }
    }
  }
`;
