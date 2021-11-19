import { gql } from '@apollo/client';

export const GET_FEEDBACK_QUERY = gql`
  query GetFeedback($siteId: ID!) { 
    site(siteId: $siteId) {
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
