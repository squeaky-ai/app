import { gql } from '@apollo/client';

export const NPS_DELETE_MUTATION = gql`
  mutation NpsDelete($input: NpsDeleteInput!) {
    npsDelete(input: $input) {
      id
    }
  }
`;
