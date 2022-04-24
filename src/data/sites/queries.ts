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
      magicErasureEnabled
      plan {
        tier
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
        tier
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
        tier
        name
        exceeded
        invalid
        maxMonthlyRecordings
        recordingsLockedCount
        visitorsLockedCount
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
      billing {
        customerId
        status
        cardType
        country
        expiry
        cardNumber
        billingName
        billingEmail
        transactions {
          id
          amount
          currency
          invoiceWebUrl
          invoicePdfUrl
          interval
          plan {
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
    plans {
      id
      name
      maxMonthlyRecordings
      pricing {
        id
        currency
        amount
      }
      dataStorageMonths
      support
      responseTimeHours
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
