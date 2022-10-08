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
