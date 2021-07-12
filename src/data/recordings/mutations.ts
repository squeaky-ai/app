import { gql } from '@apollo/client';

export const CREATE_TAG_MUTATION = gql`
  mutation TagCreate($site_id: ID!, $session_id: ID!, $name: String!) {
    tagCreate(input: { siteId: $site_id, sessionId: $session_id, name: $name }) {
      id
      recording(id: $session_id) {
        tags {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_TAG_MUTATION = gql`
  mutation TagDelete($site_id: ID!, $session_id: ID!, $tag_id: ID!) {
    tagDelete(input: { siteId: $site_id, sessionId: $session_id, tagId: $tag_id }) {
      id
      recording(id: $session_id) {
        tags {
          id
          name
        }
      }
    }
  }
`;