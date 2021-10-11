import { gql } from '@apollo/client';

export const GET_SITES_QUERY = gql`
  query GetSites {
    sites {
      id
      name
      url
      planName
      ownerName
    }
  }
`;

export const GET_SITE_QUERY = gql`
  query GetSite($siteId: ID!) {
    site(siteId: $siteId) {
      id
      name
      url
      verifiedAt
      uuid
      planName
      ownerName
      daysSinceLastRecording
      recordings(size: 1) {
        items {
          id
        }
      }
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
      ipBlacklist {
        name
        value
      }
    }
  }
`;
