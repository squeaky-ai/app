import { gql } from '@apollo/client';

export const SiteCreateMutation = gql`
  mutation SiteCreate($input: SiteCreateInput!) {
    siteCreate(input: $input) {
      id
      name
      url
    }
  }
`;
