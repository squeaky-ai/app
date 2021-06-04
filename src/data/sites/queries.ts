import { gql } from '@apollo/client';

export const getSitesQuery = gql`
  query GetSites {
    sites {
      id
      name
      url
      avatar
      planName
      ownerName
    }
  }
`;

export const getSiteQuery = gql`
  query GetSite($id: ID!) {
    site(id: $id) {
      id
      name
      url
      avatar
      planName
      ownerName
      team {
        id
        role
        status
        user {
          firstName
          lastName
          email
        }
      }
      recordings {
        items {
          id
          active
          locale
          duration
          startPage
          exitPage
          pageCount
          useragent
          viewportX
          viewportY
          viewerId
        }
        pagination {
          cursor
          isLast
          pageSize
        }
      }
    }
  }
`;
