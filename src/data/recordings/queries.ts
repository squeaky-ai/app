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
        viewerId
        dateString
        language
        durationString
        pages
        pageCount
        startPage
        exitPage
        deviceType
        viewportX
        viewportY
        browser
        active
        events {
          ... on Snapshot {
            eventId
            type
            event
            snapshot
            time
            timestamp
          }
          ... on PageView {
            eventId
            type
            locale
            useragent 
            path
            time
            timestamp
          }
          ... on Scroll {
            eventId
            type
            x
            y
            time
            timestamp
          }
          ... on Cursor {
            eventId
            type
            x
            y
            time
            timestamp
          }
          ... on Interaction {
            eventId
            type
            selector
            time
            timestamp
          }
          ... on Visibility {
            eventId
            visible
            time
            timestamp
          }
        }
      }
    }
  }
`;