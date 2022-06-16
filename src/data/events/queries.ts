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

export const GET_EVENT_STATS_QUERY = gql`
  query GetEventStats($siteId: ID!, $captureIds: [ID!]!, $groupIds: [ID!]!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id      
      eventStats(captureIds: $captureIds, groupIds: $groupIds, fromDate: $fromDate, toDate: $toDate) {
        id
        name
        type
        count
        averageEventsPerVisitor
      }
    }
  }
`;

export const GET_EVENT_FEED_QUERY = gql`
  query GetEventFeedStats($siteId: ID!, $page: Int, $size: Int, $sort: EventsFeedSort, $captureIds: [ID!]!, $groupIds: [ID!]!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id      
      eventFeed(captureIds: $captureIds, groupIds: $groupIds, page: $page, size: $size, sort: $sort, fromDate: $fromDate, toDate: $toDate) {
        items {
          id
          eventName
          timestamp
          visitor {
            id
            visitorId
            starred
          }
          recording {
            id
            sessionId
            bookmarked
          }
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
