import { gql } from '@apollo/client';

export const GET_EVENT_CAPTURES_QUERY = gql`
  query GetEventCapture($siteId: ID!, $page: Int, $size: Int, $sort: EventsCaptureSort, $search: String, $filters: EventsCaptureFilters) {
    site(siteId: $siteId) {
      id
      name
      eventCapture(page: $page, size: $size, sort: $sort, search: $search, filters: $filters) {
        items {
          id
          name
          nameAlias
          type
          rules {
            matcher
            condition
            value
            field
          }
          count
          groupIds
          groupNames
          source
          lastCountedAt {
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
          nameAlias
          type
          rules {
            matcher
            condition
            value
            field
          }
          count
          groupIds
          groupNames
          source
          lastCountedAt {
            iso8601
            niceDateTime
          }
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
        eventOrGroupId
        name
        type
        count
        averageEventsPerVisitor
        uniqueTriggers
      }
      eventCounts(captureIds: $captureIds, groupIds: $groupIds, fromDate: $fromDate, toDate: $toDate) {
        groupType
        groupRange
        items {
          dateKey
          metrics {
            id
            count
            type
          }
        }
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
          timestamp {
            iso8601
            niceDateTime
          }
          source
          data
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
