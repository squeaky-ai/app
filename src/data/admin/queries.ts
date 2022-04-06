import { gql } from '@apollo/client';

export const GET_ADMIN_QUERY = gql`
  query GetAdmin { 
    admin {
      sites {
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
      users {
        id
        fullName
        email
        superuser
        createdAt
        lastActivityAt
      }
      activeMonthlyUsers
      activeVisitors {
        siteId
        count
      }
      roles {
        owners
        admins
        members
      }
      verified {
        verified
        unverified
      }
    }
  }
`;

export const GET_ADMIN_BLOG_QUERY = gql`
  query GetAdminBlog { 
    admin {
      blogImages
    }
  }
`;

export const GET_ADMIN_ACTIVE_VISITORS_QUERY = gql`
  query GetActiveVisitorsAdmin { 
    admin {
      activeVisitors {
        siteId
        count
      }
    }
  }
`;
