import { gql } from '@apollo/client';

export const VISITOR_STARRED_MUTATION = gql`
  mutation VisitorStarred($siteId: ID!, $visitorId: ID!, $starred: Boolean!) {
    visitorStarred(input: { siteId: $siteId, visitorId: $visitorId, starred: $starred }) {
      id
      visitorId
      starred
    }
  }
`;

export const VISITOR_DELETE_MUTATION = gql`
  mutation VisitorDelete($siteId: ID!, $visitorId: ID!) {
    visitorDelete(input: { siteId: $siteId, visitorId: $visitorId }) {
      id
    }
  }
`;
