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
      verifiedAt {
        iso8601
        niceDateTime
      }
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
      verifiedAt {
        iso8601
        niceDateTime
      }
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

export const ANONYMISE_PREFERENCES_UPDATE_MUTATION = gql`
  mutation AnonymisePreferencesUpdate($input: AnonymisePreferencesUpdateInput!) {
    anonymisePreferencesUpdate(input: $input) {
      id
      anonymiseFormInputs
      anonymiseText
    }
  }
`;

export const ADMIN_SITE_PLAN_UPDATE_MUTATION = gql`
  mutation($input: AdminSitePlanUpdateInput!) {
    adminSitePlanUpdate(input: $input) {
      id
      plan {
        planId
        free
        enterprise
        name
        exceeded
        invalid
        support
        maxMonthlyRecordings
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

export const ADMIN_SITE_INGEST_UPDATE = gql`
  mutation($input: AdminSiteIngestUpdateInput!) {
    adminSiteIngestUpdate(input: $input) {
      id
      ingestEnabled
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

export const ROUTES_UPDATE_MUTATION = gql`
  mutation($input: SitesRoutesUpdateInput!) {
    routesUpdate(input: $input) {
      id
      routes
    }
  }
`;

export const SEND_TRACKING_CODE_INSTRUCTIONS = gql`
  mutation($input: SitesTrackingCodeInstructionsInput!) {
    trackingCodeInstructions(input: $input) {
      message
    }
  }
`;

export const ADMIN_SITE_TEAM_DELETE = gql`
  mutation adminSiteTeamDelete($input: AdminSiteTeamDeleteInput!) {
    adminSiteTeamDelete(input: $input) {
      id
    }
  }
`;

export const ADMIN_SITE_TEAM_ROLE_UPDATE = gql`
  mutation adminSiteTeamUpdateRole($input: AdminSiteTeamUpdateRoleInput!) {
    adminSiteTeamUpdateRole(input: $input) {
      id
      role
    }
  }
`;

export const ADMIN_SITE_BUNDLE_CREATE = gql`
  mutation adminSiteBundlesCreate($input: AdminSiteBundlesCreateInput!) {
    adminSiteBundlesCreate(input: $input) {
      id
      sites {
        id
        name
        uuid
        url
        ownerName
        verifiedAt {
          iso8601
          niceDateTime
        }
        provider
        superuserAccessEnabled
        plan {
          planId
          name
          exceeded
          invalid
          maxMonthlyRecordings
        }
        team {
          id
          role
          user {
            id
          }
        }
        bundled
        createdAt {
          iso8601
          niceDateTime
        }
      }
    }
  }
`;

export const SITE_API_KEY_CREATE = gql`
  mutation apiKeyCreate($input: SitesApiKeyCreateInput!) {
    apiKeyCreate(input: $input) {
      id
      apiKey
    }
  }
`;

export const SITE_DATA_EXPORT_CREATE = gql`
  mutation dataExportCreate($input: DataExportCreateInput!) {
    dataExportCreate(input: $input) {
      id
      filename
      exportType
      exportedAt {
        iso8601
        niceDateTime
      }
      startDate
      endDate
    }
  }
`;

export const SITE_DATA_EXPORT_DELETE = gql`
  mutation dataExportDelete($input: DataExportDeleteInput!) {
    dataExportDelete(input: $input) {
      id
    }
  }
`;
