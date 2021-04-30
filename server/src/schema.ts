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

  type AuthRequestResponse {
    emailSentAt: String
    validation: String
  }

  type AuthVerifyResponse {
    jwt: String
    validation: String
  }

  type Query {
    me: Me
  }

  type Mutation {
    authRequest(email: String!, authType: AuthType!): AuthRequestResponse!
    authVerify(email: String!, token: String!): AuthVerifyResponse!
  }
`;
