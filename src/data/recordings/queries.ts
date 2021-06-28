import { gql } from '@apollo/client';

export const GET_RECORDINGS_QUERY = gql`
  query GetRecordings($id: ID!, $page: Int, $size: Int, $query: String) {
    site(id: $id) {
      id
      name
      recordings(page: $page, size: $size, query: $query) {
        items {
          id
          active
          language
          duration
          durationString
          startPage
          exitPage
          pages
          pageCount
          deviceType
          browser
          browserString
          viewportX
          viewportY
          viewerId
          dateString
        }
        pagination {
          pageSize
          pageCount
        }
      }
    }
  }
`;
