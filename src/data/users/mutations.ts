import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UserUpdate($input: UsersUpdateInput!) {
    userUpdate(input: $input) {
      id
      firstName
      lastName
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
  mutation UserPassword($input: UsersPasswordInput!) {
    userPassword(input: $input) {
      id
    }
  }
`;
