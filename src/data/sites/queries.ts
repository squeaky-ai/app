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
    }
  }
`;
