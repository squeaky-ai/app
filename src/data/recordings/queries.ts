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

export const GET_RECORDING_QUERY = gql`
  query GetRecording($site_id: ID!, $recording_id: ID!, $cursor: String) { 
    site(id: $site_id) {
      id
      name
      recording(id: $recording_id) {
        id
        active
        events(first: 10, cursor: $cursor) {
          items {
            ... on PageView {
              type
              locale
              useragent 
              path
              time
              timestamp
            }
            ... on Scroll {
              type
              x
              y
              time
              timestamp
            }
            ... on Cursor {
              type
              x
              y
              time
              timestamp
            }
            ... on Interaction {
              type
              selector
              time
              timestamp
            }
          }
          pagination {
            cursor
            isLast
            pageSize
          }
        }
      }
    }
  }
`;