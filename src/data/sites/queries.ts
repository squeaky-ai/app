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
      plan {
        type
        name
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
        id
        type
        name
        exceeded
        recordingsLimit
        recordingsLocked
        visitorsLocked
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
