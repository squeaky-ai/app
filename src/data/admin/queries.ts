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
          tier
          name
          exceeded
          invalid
          maxMonthlyRecordings
          recordingsLockedCount
          visitorsLockedCount
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
      recordingsCount
      recordingsProcessed
      visitorsCount
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
