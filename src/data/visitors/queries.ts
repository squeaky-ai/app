import { gql } from '@apollo/client';

export const GET_VISITORS_QUERY = gql`
  query GetVisitors($siteId: ID!, $page: Int, $size: Int, $query: String, $sort: VisitorSort) {
    site(siteId: $siteId) {
      id
      name
      visitors(page: $page, size: $size, query: $query, sort: $sort) {
        items {
          viewerId
          recordingCount
          firstViewedAt
          lastActivityAt
          language
          viewportX
          viewportY
          deviceType
          browser
          browserString
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
  query GetVisitor($siteId: ID!, $viewerId: ID!, $recordingPage: Int, $recordingSort: RecordingSort) {
    site(siteId: $siteId) {
      id
      name
      visitor(viewerId: $viewerId) {
        viewerId
        recordingCount
        firstViewedAt
        lastActivityAt
        language
        viewportX
        viewportY
        deviceType
        browser
        browserString
        pageViewCount
        recordings(page: $recordingPage, size: 15, sort: $recordingSort) {
          items {
            id
            duration
            viewed
            bookmarked
            startPage
            exitPage
            pageViews
            pageCount
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
      }
    }
  }
`;
