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

export const USER_DELETE_MUTATION = gql`
  mutation UserDelete {
    userDelete(input: {}) {
      id
    }
  }
`;

export const USER_PASSWORD_MUTATION = gql`
  mutation UserPassword($input: UserPasswordInput!) {
    userPassword(input: $input) {
      id
    }
  }
`;
