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
          lastOccurance
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
      errorDetails(errorId: $errorId) {
        id
        message
        stack
        pages
        filename
        lineNumber
        colNumber
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
      errorDetails(errorId: $errorId) {
        id
        recordings(page: $page, size: $size, sort: $sort, fromDate: $fromDate, toDate: $toDate) {
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
      }
    }
  }
`;
