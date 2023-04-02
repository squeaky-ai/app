import { gql } from '@apollo/client';

export const GET_ERRORS_QUERY = gql`
  query GetErrors($siteId: ID!, $page: Int, $size: Int, $sort: ErrorsSort, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      errors(page: $page, size: $size, sort: $sort, fromDate: $fromDate, toDate: $toDate) {
        items {
          id
          message
          errorCount
          recordingCount
          lastOccurance {
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
      errorsCounts(fromDate: $fromDate, toDate: $toDate) {
        groupType
        groupRange
        items {
          dateKey
          count
        }
      }
    }
  }
`;

export const GET_ERRORS_DETAILS_QUERY = gql`
  query GetErrorsDetails($siteId: ID!, $errorId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      error(errorId: $errorId, fromDate: $fromDate, toDate: $toDate) {
        details {
          id
          message
          stack
          pages
          filename
          lineNumber
          colNumber
        }
      }
      errorsCounts(errorId: $errorId, fromDate: $fromDate, toDate: $toDate) {
        groupType
        groupRange
        items {
          dateKey
          count
        }
      }
    }
  }
`;

export const GET_ERRORS_DETAILS_RECORDINGS_QUERY = gql`
  query GetErrorsDetailsRecordings($siteId: ID!, $errorId: ID!, $page: Int, $size: Int, $sort: RecordingsSort, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      error(errorId: $errorId, fromDate: $fromDate, toDate: $toDate) {
        recordings(page: $page, size: $size, sort: $sort) {
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

export const GET_ERRORS_DETAILS_VISITORS_QUERY = gql`
  query GetErrorsDetailsVisitors($siteId: ID!, $errorId: ID!, $page: Int, $size: Int, $sort: VisitorsSort, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
    site(siteId: $siteId) {
      id
      error(errorId: $errorId, fromDate: $fromDate, toDate: $toDate) {
        visitors(page: $page, size: $size, sort: $sort) {
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
  }
`;
