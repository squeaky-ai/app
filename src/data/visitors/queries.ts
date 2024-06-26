import { gql } from '@apollo/client';

export const GET_VISITORS_QUERY = gql`
  query GetVisitors($siteId: ID!, $page: Int, $size: Int, $sort: VisitorsSort, $search: String, $filters: VisitorsFilters, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      name
      visitors(page: $page, size: $size, sort: $sort, search: $search, filters: $filters, fromDate: $fromDate, toDate: $toDate) {
        items {
          id
          visitorId
          viewed
          recordingCount {
            total
          }
          firstViewedAt {
            iso8601
            niceDateTime
          }
          lastActivityAt {
            iso8601
            niceDateTime
          }
          language
          source
          devices {
            deviceType
            viewportX
            viewportY
            deviceX
            deviceY
            browserName
            browserDetails
            useragent
          }
          countries {
            code
            name
          }
          starred
          linkedData
          averageRecordingDuration
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

export const GET_VISITOR_QUERY = gql`
  query GetVisitor($siteId: ID!, $visitorId: ID!) {
    site(siteId: $siteId) {
      id
      name
      visitor(visitorId: $visitorId) {
        id
        visitorId
        viewed
        recordingCount {
          total
          new
        }
        firstViewedAt {
          iso8601
          niceDateTime
        }
        lastActivityAt {
          iso8601
          niceDateTime
        }
        language
        source
        devices {
          deviceType
          viewportX
          viewportY
          deviceX
          deviceY
          browserName
          browserDetails
          useragent
        }
        countries {
          code
          name
        }
        pageViewsCount {
          total
          unique
        }
        starred
        linkedData
        pagesPerSession
        averageSessionDuration
      }
    }
  }
`;

export const GET_VISITOR_RECORDINGS_QUERY = gql`
  query GetVisitor($siteId: ID!, $visitorId: ID!, $page: Int, $sort: RecordingsSort) {
    site(siteId: $siteId) {
      id
      name
      visitor(visitorId: $visitorId) {
        id
        recordings(page: $page, size: 10, sort: $sort) {
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
            visitor {
              id
              visitorId
              starred
            }
            nps {
              score
            }
            sentiment {
              score
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
  }
`;

export const GET_VISITOR_PAGES_QUERY = gql`
  query GetVisitor($siteId: ID!, $visitorId: ID!, $page: Int, $sort: VisitorsPagesSort) {
    site(siteId: $siteId) {
      id
      visitor(visitorId: $visitorId) {
        id
        pages(page: $page, size: 10, sort: $sort) {
          items {
            pageView
            pageViewCount
            averageTimeOnPage
          }
          pagination {
            pageSize
            total
            sort
          }
        }
      }
    }
  }
`;

export const GET_VISITOR_EXPORT_QUERY = gql`
  query GetVisitorExport($siteId: ID!, $visitorId: ID!) {
    site(siteId: $siteId) {
      id
      visitor(visitorId: $visitorId) {
        export {
          recordingsCount
          npsFeedback {
            score
            comment
            contact
            email
          }
          sentimentFeedback {
            score
            comment
          }
          linkedData
        }
      }
    }
  }
`;

export const GET_VISITOR_EVENTS_QUERY = gql`
  query GetVisitorEvents($siteId: ID!, $visitorId: ID!, $page: Int, $size: Int, $sort: EventsFeedSort) {
    site(siteId: $siteId) {
      id
      visitor(visitorId: $visitorId) {
        id
        events(page: $page, size: $size, sort: $sort) {
          items {
            id
            eventName
            timestamp {
              iso8601
              niceDateTime
            }
            source
            data
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
  }
`;
