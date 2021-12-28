import { gql } from '@apollo/client';

export const GET_TEAM_QUERY = gql`
  query GetTeam($siteId: ID!) {
    site(siteId: $siteId) {
      id
      team {
        id
        role
        roleName
        status
        user {
          id
          firstName
          lastName
          fullName
          email
        }
      }
    }
  }
`;
