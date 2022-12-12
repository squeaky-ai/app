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
          firstViewedAt
          lastActivityAt
          language
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
  query GetVisitor($siteId: ID!, $visitorId: ID!, $recordingPage: Int, $recordingSort: RecordingsSort, $pagesPage: Int, $pagesSort: VisitorsPagesSort) {
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
        firstViewedAt
        lastActivityAt
        language
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
        recordings(page: $recordingPage, size: 10, sort: $recordingSort) {
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
            connectedAt
            disconnectedAt
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
        pages(page: $pagesPage, size: 10, sort: $pagesSort) {
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
        pagesPerSession
        averageSessionDuration
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
