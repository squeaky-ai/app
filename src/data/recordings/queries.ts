import { gql } from '@apollo/client';

export const GET_RECORDINGS_QUERY = gql`
  query GetRecordings($id: ID!, $page: Int, $size: Int, $query: String, $sort: Sort) {
    site(id: $id) {
      id
      name
      recordings(page: $page, size: $size, query: $query, sort: $sort) {
        items {
          id
          active
          language
          duration
          durationString
          startPage
          exitPage
          pageViews
          pageCount
          deviceType
          browser
          browserString
          viewportX
          viewportY
          sessionId
          viewerId
          dateString
          connectedAt
          disconnectedAt
        }
        pagination {
          pageSize
          pageCount
          sort
        }
      }
    }
  }
`;

export const GET_RECORDING_QUERY = gql`
  query GetRecording($site_id: ID!, $recording_id: ID!) { 
    site(id: $site_id) {
      id
      name
      recording(id: $recording_id) {
        id
        sessionId
        viewerId
        dateString
        language
        durationString
        pageViews
        pageCount
        startPage
        exitPage
        deviceType
        viewportX
        viewportY
        browser
        active
        connectedAt
        disconnectedAt
        tags {
          id
          name
        }
        notes {
          id
          timestamp
          body
          user {
            fullName
          }
        }
        events
      }
    }
  }
`;