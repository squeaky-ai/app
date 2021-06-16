import { gql } from '@apollo/client';

export const GET_SITES_QUERY = gql`
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

export const GET_SITE_QUERY = gql`
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
          id
          firstName
          lastName
          fullName
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
