import { gql } from '@apollo/client';

export const GET_RECORDINGS_QUERY = gql`
  query GetRecordings($siteId: ID!, $page: Int, $size: Int, $sort: RecordingsSort, $filters: RecordingsFilters, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      name
      recordings(page: $page, size: $size, sort: $sort, filters: $filters, fromDate: $fromDate, toDate: $toDate) {
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
          referrer
          device {
            deviceType
            viewportX
            viewportY
            deviceX
            deviceY
            browserName
            browserDetails
            useragent
          }
          countryCode
          countryName
          sessionId
          connectedAt {
            iso8601
            niceDateTime
          }
          disconnectedAt {
            iso8601
            niceDateTime
          }
          inactivity
          activityDuration
          visitor {
            id
            visitorId
            starred
            linkedData
          }
          nps {
            score
          }
          sentiment {
            score
          }
          rageClicked
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
  query GetRecording($siteId: ID!, $recordingId: ID!, $eventPage: Int, $excludeRecordingIds: [ID!]) { 
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
        referrer
        device {
          deviceType
          viewportX
          viewportY
          deviceX
          deviceY
          browserName
          browserDetails
          useragent
        }
        countryCode
        countryName
        connectedAt {
          iso8601
          niceDateTime
        }
        disconnectedAt {
          iso8601
          niceDateTime
        }
        inactivity
        activityDuration
        visitor {
          id
          visitorId
          starred
          linkedData
          firstViewedAt {
            iso8601
            niceDateTime
          }
          lastActivityAt {
            iso8601
            niceDateTime
          }
          recordingCount {
            total
          }
          recordings(page: 0, size: 5, sort: connected_at__desc, excludeRecordingIds: $excludeRecordingIds) {
            items {
              id
              sessionId
              duration
              disconnectedAt {
                iso8601
                shortDate
              }
            }
            pagination {
              pageSize
              total
              sort
            }
          }
        }
        pages {
          id
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
        nps {
          score
          comment
          email
          contact
        }
        sentiment {
          score
          comment
        }
        events(page: $eventPage) {
          items {
            id
            data
            type
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
`;

export const GET_RECORDING_EVENTS_QUERY = gql`
  query GetRecordingEvents($siteId: ID!, $recordingId: ID!, $eventPage: Int) { 
    site(siteId: $siteId) {
      id
      recording(recordingId: $recordingId) {
        id
        events(page: $eventPage) {
          items {
            id
            data
            type
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
`;
