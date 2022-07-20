import { gql } from '@apollo/client';

export const GET_FEEDBACK_QUERY = gql`
  query GetFeedback($siteId: ID!) { 
    site(siteId: $siteId) {
      id
      feedback {
        id
        npsEnabled
        npsAccentColor
        npsSchedule
        npsPhrase
        npsFollowUpEnabled
        npsContactConsentEnabled
        npsLayout
        npsExcludedPages
        sentimentEnabled
        sentimentAccentColor
        sentimentExcludedPages
        sentimentLayout
        sentimentDevices
      }
    }
  }
`;
