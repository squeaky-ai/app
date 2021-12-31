import { gql } from '@apollo/client';

export const GET_SITES_QUERY = gql`
  query GetSites {
    sites {
      id
      name
      url
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
      ownerName
      daysSinceLastRecording
      recordingsCount
      team {
        id
        role
        user {
          id
        }
      }
      ipBlacklist {
        name
        value
      }
      domainBlacklist {
        type
        value
      }
    }
  }
`;

export const GET_PLAN_QUERY = gql`
  query GetSitePlan($siteId: ID!) {
    site(siteId: $siteId) {
      id
      plan {
        type
        name
        exceeded
        recordingsLimit
        recordingsLocked
      }
    }
  }
`;
