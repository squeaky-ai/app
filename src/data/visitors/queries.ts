import { gql } from '@apollo/client';

export const GET_VISITORS_QUERY = gql`
  query GetVisitors($siteId: ID!, $page: Int, $size: Int, $sort: VisitorsSort, $filters: VisitorsFilters) {
    site(siteId: $siteId) {
      id
      name
      visitors(page: $page, size: $size, sort: $sort, filters: $filters) {
        items {
          id
          visitorId
          viewed
          recordingsCount {
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
          starred
          attributes
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
        recordingsCount {
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
        pageViewsCount {
          total
          unique
        }
        starred
        attributes
        recordings(page: $recordingPage, size: 10, sort: $recordingSort) {
          items {
            id
            duration
            viewed
            bookmarked
            startPage
            exitPage
            pageViews
            pageCount
            device {
              deviceType
              viewportX
              viewportY
              deviceX
              deviceY
              browserName
              browserDetails
            }
            sessionId
            connectedAt
            disconnectedAt
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
