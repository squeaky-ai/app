import { gql } from '@apollo/client';

export const CREATE_SITE_MUTATION = gql`
  mutation SiteCreate($input: SitesCreateInput!) {
    siteCreate(input: $input) {
      id
      name
      url
      ownerName
    }
  }
`;

export const UPDATE_SITE_MUTATION = gql`
  mutation SiteUpdate($input: SitesUpdateInput!) {
    siteUpdate(input: $input) {
      id
      name
      url
      verifiedAt
    }
  }
`;

export const DELETE_SITE_MUTATION = gql`
  mutation SiteDelete($input: SitesDeleteInput!) {
    siteDelete(input: $input) {
      id
    }
  }
`;

export const VERIFY_SITE_MUTATION = gql`
  mutation SiteVerify($input: SitesVerifyInput!) {
    siteVerify(input: $input) {
      id
      verifiedAt
    }
  }
`;

export const CREATE_IP_BLACKLIST_MUTATION = gql`
  mutation SiteIpBlacklistCreate($input: SitesIpBlacklistCreateInput!) {
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
  mutation SiteIpBlacklistDelete($input: SitesIpBlacklistDeleteInput!) {
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
  mutation SiteDomainBlacklistCreate($input: SitesDomainBlacklistCreateInput!) {
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
  mutation SiteDomainBlacklistDelete($input: SitesDomainBlacklistDeleteInput!) {
    domainBlacklistDelete(input: $input) {
      id
      domainBlacklist {
        type
        value
      }
    }
  }
`;

export const MAGIC_ERASURE_ENABLED_MUTATION = gql`
  mutation MagicErasureUpdate($input: SitesMagicErasureUpdateInput!) {
    magicErasureUpdate(input: $input) {
      id
      magicErasureEnabled
    }
  }
`;

export const CSS_SELECTOR_BLACKLIST_CREATE_MUTATION = gql`
  mutation CssSelectorBlacklistCreate($input: SitesCssSelectorBlacklistCreateInput!) {
    cssSelectorBlacklistCreate(input: $input) {
      id
      cssSelectorBlacklist
    }
  }
`;

export const CSS_SELECTOR_BLACKLIST_DELETE_MUTATION = gql`
  mutation CssSelectorBlacklistDelete($input: SitesCssSelectorBlacklistDeleteInput!) {
    cssSelectorBlacklistDelete(input: $input) {
      id
      cssSelectorBlacklist
    }
  }
`;

export const ANONYMISE_FORM_INPUTS_UPDATE_MUTATION = gql`
  mutation AnonymuseFormInputsUpdate($input: AnonymiseFormInputsUpdateInput!) {
    anonymiseFormInputsUpdate(input: $input) {
      id
      anonymiseFormInputs
    }
  }
`;

export const ADMIN_SITE_PLAN_UPDATE_MUTATION = gql`
  mutation($input: AdminSitePlanUpdateInput!) {
    adminSitePlanUpdate(input: $input) {
      id
      plan {
        tier
        name
        exceeded
        invalid
        support
        maxMonthlyRecordings
        recordingsLockedCount
        visitorsLockedCount
        ssoEnabled
        auditTrailEnabled
        privateInstanceEnabled
        responseTimeHours
        dataStorageMonths
        notes
      }
    }
  }
`;

export const ADMIN_SITE_ASSOCIATE_CUSTOMER_MUTATION = gql`
  mutation($input: AdminSiteAssociateCustomerInput!) {
    adminSiteAssociateCustomer(input: $input) {
      id
      billing {
        customerId
      }
    }
  }
`;

export const SUPERUSER_ACESSS_UPDATE = gql`
  mutation($input: SitesSuperuserAccessUpdateInput!) {
    superuserAccessUpdate(input: $input) {
      id
      superuserAccessEnabled
    }
  }
`;

export const ADMIN_SITE_DELETE_MUTATION = gql`
  mutation AdminSiteDelete($input: AdminSiteDeleteInput!) {
    adminSiteDelete(input: $input) {
      id
    }
  }
`;
