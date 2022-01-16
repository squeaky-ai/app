import { gql } from '@apollo/client';

export const SENTIMENT_DELETE_MUTATION = gql`
  mutation NpsDelete($input: SentimentDeleteInput!) {
    sentimentDelete(input: $input) {
      id
    }
  }
`;
