import { gql } from '@apollo/client';

export const GET_ADMIN_QUERY = gql`
  query GetAdmin { 
    activeVisitorsAdmin {
      siteId
      count
    }
    sitesAdmin {
      id
      name
      uuid
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
      createdAt
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
