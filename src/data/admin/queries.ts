import { gql } from '@apollo/client';

export const GET_ADMIN_QUERY = gql`
  query GetAdmin { 
    sitesAdmin {
      id
      name
      url
      ownerName
      verifiedAt
      plan {
        type
        name
        exceeded
        recordingsLimit
        recordingsLocked
        visitorsLocked
      }
      team {
        id
        role
        user {
          id
        }
      }
    }
    usersAdmin {
      id
      fullName
      email
      superuser
      createdAt
    }
  }
`;
