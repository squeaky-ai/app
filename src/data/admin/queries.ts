import { gql } from '@apollo/client';

export const GET_ADMIN_QUERY = gql`
  query GetAdmin { 
    admin {
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
        readonly
      }
      verified {
        verified
        unverified
      }
      recordingsStored {
        count
        date
      }
      sitesStored {
        allCount
        verifiedCount
        unverifiedCount
        date
      }
      usersStored {
        count
        date
      }
      usersCount
      sitesCount
    }
  }
`;

export const GET_ADMIN_SITE_QUERY = gql`
  query GetAdminSite($siteId: ID!) { 
    admin {
      site(siteId: $siteId) {
        id
        name
        uuid
        url
        ownerName
        verifiedAt
        superuserAccessEnabled
        ingestEnabled
        provider
        plan {
          tier
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
        recordingCounts {
          totalAll
          deletedAll
          totalCurrentMonth
          deletedCurrentMonth
        }
        bundled
        bundledWith {
          id
          name
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

export const GET_ADMIN_USERS_QUERY = gql`
  query GetAdminUsers($page: Int, $size: Int, $search: String, $sort: AdminUserSort) {
    admin {
      users(page: $page, size: $size, search: $search, sort: $sort) {
        items {
          id
          fullName
          email
          superuser
          createdAt
          provider
          lastActivityAt
          visitor {
            id
            visitorId
          }
          sites {
            id
            name
          }
          partner {
            id
            name
            slug
          }
        }
        pagination {
          pageSize
          total
          sort
        }
      }
    }
  }
`;

export const GET_ADMIN_SITES_QUERY = gql`
  query GetAdminSites($page: Int, $size: Int, $search: String, $sort: AdminSiteSort) {
    admin {
      sites(page: $page, size: $size, search: $search, sort: $sort) {
        items {
          id
          name
          uuid
          url
          ownerName
          provider
          verifiedAt
          superuserAccessEnabled
          plan {
            tier
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
          createdAt
        }
        pagination {
          pageSize
          total
          sort
        }
      }
      activeVisitors {
        siteId
        count
      }
    }
  }
`;

export const GET_ADMIN_SITES_BUNDLES_QUERY = gql`
  query GetAdminSitesQueries {
    admin {
      sitesBundles {
        id
        name
        plan {
          name
        }
        sites {
          id
          name
          uuid
          url
          ownerName
          verifiedAt
          provider
          superuserAccessEnabled
          plan {
            tier
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
          createdAt
        }
      }
    }
  }
`;

export const GET_ADMIN_USER_QUERY = gql`
  query GetAdminUser($userId: ID!) {
    admin {
      user(userId: $userId) {
        id
        fullName
        email
        superuser
        createdAt
        lastActivityAt
        provider
        visitor {
          id
          visitorId
        }
        sites {
          id
          name
        }
        partner {
          id
          name
          slug
          referrals {
            id
            url
            site {
              id
              url
              name
              verifiedAt
              plan {
                tier
                name
              }
            }
          }
          invoices {
            id
            filename
            invoiceUrl
            status
            amount
            currency
            issuedAt
            dueAt
            paidAt
          }
          allTimeCommission {
            id
            amount
            currency
          }
          payOuts {
            id
            amount
            currency
          }
        }
      }
    }
  }
`;

export const GET_ADMIN_USERS_PARTNERS_QUERY = gql`
  query GetAdminUsersPartners {
    admin {
      usersPartners {
        id
        fullName
        email
        superuser
        createdAt
        provider
        lastActivityAt
        visitor {
          id
          visitorId
        }
        sites {
          id
          name
        }
        partner {
          id
          name
          slug
        }
      }
    }
  }
`;
