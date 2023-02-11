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
      siteType
      uuid
      provider
      ownerName
      daysSinceLastRecording
      recordingsCount
      magicErasureEnabled
      anonymiseFormInputs
      anonymiseText
      superuserAccessEnabled
      apiKey
      plan {
        planId
        free
        enterprise
        name
        invalid
        featuresEnabled
        teamMemberLimit
      }
      team {
        id
        role
        linkedDataVisible
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

export const GET_SITE_QUERY_CREATE = gql`
  query GetSiteCreate($siteId: ID!) {
    site(siteId: $siteId) {
      id
      name
      url
      uuid
      verifiedAt
      magicErasureEnabled
      anonymiseFormInputs
      anonymiseText
      consent {
        id
        name
        consentMethod
        layout
        privacyPolicyUrl
        languages
        languagesDefault
      }
    }
  }
`;

export const GET_SITE_BY_UUID_QUERY = gql`
  query GetSite($siteId: ID!) {
    siteByUuid(siteId: $siteId) {
      id
      name
      url
      verifiedAt
      uuid
      ownerName
      daysSinceLastRecording
      recordingsCount
      magicErasureEnabled
      cssSelectorBlacklist
      plan {
        planId
        name
        invalid
      }
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
        planId
        name
        exceeded
        invalid
        maxMonthlyRecordings
        dataStorageMonths
        responseTimeHours
      }
    }
  }
`;

export const GET_ACTIVE_USERS_QUERY = gql`
  query GetActiveUserCount($siteId: ID!) {
    site(siteId: $siteId) {
      id
      activeUserCount
    }
  }
`;

export const GET_BILLING_QUERY = gql`
  query GetSiteBilling($siteId: ID!) {
    site(siteId: $siteId) {
      id
      plan {
        planId
        name
        exceeded
        free
        deprecated
        enterprise
        invalid
        support
        maxMonthlyRecordings
        ssoEnabled
        auditTrailEnabled
        privateInstanceEnabled
        responseTimeHours
        dataStorageMonths
        notes
        pricing {
          id
          currency
          amount
          interval
        }
      }
      providerAuth {
        id
        provider
        providerUuid
        authType
        apiEndpoint
        providerAppUuid
        sdkUrl
      }
      billing {
        customerId
        status
        cardType
        country
        expiry
        cardNumber
        billingName
        billingEmail
        billingAddress {
          city
          country
          line1
          line2
          postalCode
          state
        }
        taxIds {
          type
          value
        }
        transactions {
          id
          amount
          currency
          invoiceWebUrl
          invoicePdfUrl
          interval
          plan {
            id
            name
          }
          periodStartAt
          periodEndAt
          discountName
          discountPercentage
          discountAmount
        }
      }
    }
    plans(siteId: $siteId) {
      id
      name
      description
      plan {
        id
        name
        free
        deprecated
        enterprise
        maxMonthlyRecordings
        featuresEnabled
        pricing {
          id
          currency
          amount
          interval
        }
        dataStorageMonths
        support
        responseTimeHours
        teamMemberLimit
      }
      show
      current
      usage
      includesCapabilitiesFrom
      capabilities
      options
    }
  }
`;

export const GET_VERIFIED_AT_QUERY = gql`
  query GetVerifiedAt($siteId: ID!) {
    site(siteId: $siteId) {
      id
      verifiedAt
    }
  }
`;

export const GET_ROUTES_QUERY = gql`
  query GetSiteRoutes($siteId: ID!) {
    site(siteId: $siteId) {
      id
      routes
    }
  }
`;
