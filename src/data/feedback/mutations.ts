import { gql } from '@apollo/client';

export const FEEDBACK_UPDATE_MUTATION = gql`
  mutation FeedbackUpdate($input: FeedbackUpdateInput!) {
    feedbackUpdate(input: $input) {
      id
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
`;
