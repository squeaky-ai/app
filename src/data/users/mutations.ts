import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UserUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`;