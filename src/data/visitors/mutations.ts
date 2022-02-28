import { gql } from '@apollo/client';

export const VISITOR_STARRED_MUTATION = gql`
  mutation VisitorStarred($input: VisitorsStarredInput!) {
    visitorStarred(input: $input) {
      id
      visitorId
      starred
    }
  }
`;

export const VISITOR_DELETE_MUTATION = gql`
  mutation VisitorDelete($input: VisitorsDeleteInput!) {
    visitorDelete(input: $input) {
      id
    }
  }
`;
