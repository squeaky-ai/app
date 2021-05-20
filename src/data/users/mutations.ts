import { gql } from '@apollo/client';

export const requestTokenMutation = gql`
  mutation RequestToken($input: AuthRequestInput!) {
    authRequest(input: $input) {
      emailSentAt
    }
  }
`;

export const verifyTokenMutation = gql`
  mutation VerifyToken($input: AuthVerifyInput!) {
    authVerify(input: $input) {
      expiresAt
      jwt
      user {
        email
      }
    }
  }
`;
