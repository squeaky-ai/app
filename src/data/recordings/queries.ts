import { gql } from '@apollo/client';

export const GET_RECORDINGS_QUERY = gql`
  query GetRecordings($id: ID!, $cursor: String) {
    site(id: $id) {
      id
      recordings(first: 10, cursor: $cursor) {
        items {
          id
          active
          locale
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
          cursor
          isLast
          pageSize
        }
      }
    }
  }
`;
