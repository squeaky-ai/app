import { gql } from '@apollo/client';

export const GET_RECORDINGS_QUERY = gql`
  query GetRecordings($siteId: ID!, $page: Int, $size: Int, $query: String, $sort: RecordingSort) {
    site(siteId: $siteId) {
      id
      name
      recordings(page: $page, size: $size, query: $query, sort: $sort) {
        items {
          id
          language
          duration
          viewed
          bookmarked
          startPage
          exitPage
          pageViews
          pageCount
          deviceType
          browser
          browserString
          viewportX
          viewportY
          sessionId
          connectedAt
          disconnectedAt
          visitor {
            id
            visitorId
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

export const GET_RECORDING_QUERY = gql`
  query GetRecording($siteId: ID!, $recordingId: ID!, $eventPage: Int) { 
    site(siteId: $siteId) {
      id
      name
      recording(recordingId: $recordingId) {
        id
        sessionId
        language
        viewed
        duration
        bookmarked
        pageViews
        pageCount
        startPage
        exitPage
        deviceType
        viewportX
        viewportY
        browser
        connectedAt
        disconnectedAt
        visitor {
          id
          visitorId
          starred
        }
        tags {
          id
          name
        }
        notes {
          id
          timestamp
          body
          user {
            fullName
          }
        }
        previousRecording {
          id
        }
        nextRecording {
          id
        }
        events(page: $eventPage) {
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

export const GET_RECORDING_EVENTS_QUERY = gql`
  query GetRecording($siteId: ID!, $recordingId: ID!, $eventPage: Int) { 
    site(siteId: $siteId) {
      id
      recording(recordingId: $recordingId) {
        id
        events(page: $eventPage) {
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
