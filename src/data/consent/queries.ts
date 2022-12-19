import { gql } from '@apollo/client';

export const GET_CONSENT_QUERY = gql`
  query GetConsent($siteId: ID!) { 
    site(siteId: $siteId) {
      id
      consent {
        id
        name
        consentMethod
        layout
        privacyPolicyUrl
        languages
        languagesDefault
      }
    }
  }
`;
