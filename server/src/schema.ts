import { gql } from 'apollo-server';

export const typeDefs = gql`
  enum AuthType {
    LOGIN
    SIGNUP
  }

  type Me {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    createdAt: String!
    updatedAt: String
  }

  type AuthenticationResponse {
    jwt: String
    emailSentAt: String
    validation: String
  }

  type Query {
    me: Me
  }

  type Mutation {
    authRequest(email: String!, authType: AuthType!): AuthenticationResponse!
    authVerification(email: String!, token: String! authType: AuthType!): AuthenticationResponse!
  }
`;
