import { gql } from '@apollo/client';

export const CREATE_SITE_MUTATION = gql`
  mutation SiteCreate($input: SiteCreateInput!) {
    siteCreate(input: $input) {
      id
      name
      url
    }
  }
`;

export const UPDATE_SITE_MUTATION = gql`
  mutation SiteUpdate($input: SiteUpdateInput!) {
    siteUpdate(input: $input) {
      id
      name
      url
      checklistDismissedAt
    }
  }
`;

export const DELETE_SITE_MUTATION = gql`
  mutation SiteDelete($input: SiteDeleteInput!) {
    siteDelete(input: $input) {
      id
    }
  }
`;

export const VERIFY_SITE_MUTATION = gql`
  mutation SiteVerify($input: SiteVerifyInput!) {
    siteVerify(input: $input) {
      id
      verifiedAt
    }
  }
`;
