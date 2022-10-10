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
  query GetAdmin($siteId: ID!) { 
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
          lastActivityAt
          visitor {
            id
            visitorId
          }
          sites {
            id
            name
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
