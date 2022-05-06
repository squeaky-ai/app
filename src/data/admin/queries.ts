import { gql } from '@apollo/client';

export const GET_ADMIN_QUERY = gql`
  query GetAdmin { 
    admin {
      sites {
        id
        name
        uuid
        url
        ownerName
        verifiedAt
        plan {
          tier
          name
          exceeded
          invalid
          maxMonthlyRecordings
          recordingsLockedCount
          visitorsLockedCount
        }
        team {
          id
          role
          user {
            id
          }
        }
        createdAt
      }
      users {
        id
        fullName
        email
        superuser
        createdAt
        lastActivityAt
      }
      activeMonthlyUsers
      recordingsCount
      recordingsProcessed
      visitorsCount
      activeVisitors {
        siteId
        count
      }
      roles {
        owners
        admins
        members
      }
      verified {
        verified
        unverified
      }
      recordingsStored {
         count
         date
      }
    }
  }
`;

export const GET_ADMIN_SITE_QUERY = gql`
  query GetAdmin($siteId: ID!) { 
    admin {
      site(siteId: $siteId) {
        id
        name
        uuid
        url
        ownerName
        verifiedAt
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
        team {
          id
          role
          user {
            id
          }
        }
        createdAt
      }
      activeVisitors {
        siteId
        count
      }
    }
  }
`;

export const GET_ADMIN_BLOG_QUERY = gql`
  query GetAdminBlog { 
    admin {
      blogImages
    }
  }
`;
