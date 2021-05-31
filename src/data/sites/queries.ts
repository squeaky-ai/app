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