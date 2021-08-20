import { gql } from '@apollo/client';

// TODO get the stuff back

export const VISITOR_STARRED_MUTATION = gql`
  mutation VisitorStarred($siteId: ID!, $visitorId: ID!, $starred: Boolean!) {
    visitorStarred(input: { siteId: $siteId, visitorId: $visitorId, starred: $starred }) {
      id
      visitor(visitorId: $visitorId) {
        userId
        visitorId
        starred
      }
    }
  }
`;
