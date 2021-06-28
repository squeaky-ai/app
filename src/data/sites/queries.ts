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
      verifiedAt
      checklistDismissedAt
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
    }
  }
`;
