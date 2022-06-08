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

export const GET_EVENT_GROUPS_QUERY = gql`
  query GetEventGroups($siteId: ID!) {
    site(siteId: $siteId) {
      id
      name
      eventGroups {
        id
        name
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
      }
    }
  }
`;

export const GET_EVENT_HISTORY_STATS_QUERY = gql`
  query GetEventHistoryStats($siteId: ID!, $captureIds: [ID!]!, $groupIds: [ID!]!) {
    site(siteId: $siteId) {
      id      
      eventHistoryStats(captureIds: $captureIds, groupIds: $groupIds) {
        id
        name
        type
        count
        averageEventsPerVisitor
      }
    }
  }
`;
