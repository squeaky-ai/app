import { gql } from '@apollo/client';

export const FEEDBACK_CREATE_MUTATION = gql`
  mutation TeamInvite($input: FeedbackCreateInput!) {
    feedbackCreate(input: $input) {
      message
    }
  }
`;
