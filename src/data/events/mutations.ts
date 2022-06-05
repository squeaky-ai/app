import { gql } from '@apollo/client';

export const DELETE_EVENT_CAPTURE_MUTATION = gql`
  mutation EventCaptureDelete($input: EventCaptureDeleteInput!) {
    eventCaptureDelete(input: $input) {
      id
    }
  }
`;

export const BULK_DELETE_EVENT_CAPTURE_MUTATION = gql`
  mutation EventCaptureDeleteBulk($input: EventCaptureDeleteBulkInput!) {
    eventCaptureDeleteBulk(input: $input) {
      id
    }
  }
`;

export const DELETE_EVENT_GROUP_MUTATION = gql`
  mutation EventGroupDelete($input: EventGroupDeleteInput!) {
    eventGroupDelete(input: $input) {
      id
    }
  }
`;

export const CREATE_EVENT_CAPTURE_MUTATION = gql`
  mutation EventCaptureCreate($input: EventCaptureCreateInput!) {
    eventCaptureCreate(input: $input) {
      id
      name
      type
      rules {
        condition
        matcher
        value
      }
      count
      lastCountedAt
      groupNames
    }
  }
`;
