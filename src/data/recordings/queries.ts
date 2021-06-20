import { gql } from '@apollo/client';

export const GET_RECORDINGS_QUERY = gql`
  query GetRecordings($id: ID!, $page: Int, $size: Int) {
    site(id: $id) {
      id
      name
      recordings(page: $page, size: $size) {
        items {
          id
          active
          language
          duration
          startPage
          exitPage
          pageCount
          deviceType
          browser
          viewportX
          viewportY
          viewerId
        }
        pagination {
          pageSize
          pageCount
        }
      }
    }
  }
`;
