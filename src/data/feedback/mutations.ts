import { gql } from '@apollo/client';

export const FEEDBACK_CREATE_MUTATION = gql`
  mutation FeedbackCreate($input: FeedbackCreateInput!) {
    feedbackCreate(input: $input) {
      message
    }
  }
`;

export const FEEDBACK_UPDATE_MUTATION = gql`
  mutation FeedbackUpdate($input: FeedbackUpdateInput!) {
    feedbackUpdate(input: $input) {
      id
      feedback {
        npsEnabled
        npsAccentColor
        npsPhrase
        npsFollowUpEnabled
        npsContactConsentEnabled
        npsLayout
        sentimentEnabled
        sentimentAccentColor
        sentimentExcludedPages
        sentimentLayout
      }
    }
  }
`;
