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
      verifiedAt
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

export const CREATE_IP_BLACKLIST_MUTATION = gql`
  mutation SiteIpBlacklistCreate($input: SiteIpBlacklistCreateInput!) {
    ipBlacklistCreate(input: $input) {
      id
      ipBlacklist {
        name
        value
      }
    }
  }
`;

export const DELETE_IP_BLACKLIST_MUTATION = gql`
  mutation SiteIpBlacklistDelete($input: SiteIpBlacklistDeleteInput!) {
    ipBlacklistDelete(input: $input) {
      id
      ipBlacklist {
        name
        value
      }
    }
  }
`;

export const CREATE_DOMAIN_BLACKLIST_MUTATION = gql`
  mutation SiteDomainBlacklistCreate($input: SiteDomainBlacklistCreateInput!) {
    domainBlacklistCreate(input: $input) {
      id
      domainBlacklist {
        type
        value
      }
    }
  }
`;

export const DELETE_DOMAIN_BLACKLIST_MUTATION = gql`
  mutation SiteDomainBlacklistDelete($input: SiteDomainBlacklistDeleteInput!) {
    domainBlacklistDelete(input: $input) {
      id
      domainBlacklist {
        type
        value
      }
    }
  }
`;
