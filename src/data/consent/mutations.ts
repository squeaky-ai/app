import { gql } from '@apollo/client';

export const CONSENT_UPDATE_MUTATION = gql`
  mutation ConsentUpdate($input: ConsentUpdateInput!) {
    consentUpdate(input: $input) {
      id
      name
      consentMethod
      layout
      privacyPolicyUrl
      languages
      languagesDefault
    }
  }
`;
