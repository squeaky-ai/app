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
      sitesProviders {
        providerName
        count
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
        verifiedAt {
          iso8601
          niceDateTime
        }
        superuserAccessEnabled
        ingestEnabled
        provider
        apiKey
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
          teamMemberLimit
          featuresEnabled
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
          roleName
          status
          user {
            id
            fullName
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
        createdAt  {
          iso8601
          niceDateTime
        }
        providerAuth {
          publishHistory
        }
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
          createdAt {
            iso8601
            niceDateTime
          }
          provider
          lastActivityAt {
            iso8601
            niceDateTime
          }
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
          verifiedAt {
            iso8601
            niceDateTime
          }
          superuserAccessEnabled
          plan {
            planId
            name
            exceeded
            invalid
            free
            maxMonthlyRecordings
            currentMonthRecordingsCount
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
      }
    }
  }
`;

export const GET_ADMIN_SITES_BUNDLE_QUERY = gql`
  query GetAdminSiteBundleQueries($bundleId: ID!) {
    admin {
      sitesBundle(bundleId: $bundleId) {
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
            currentMonthRecordingsCount
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
        stats {
          totalAll
          deletedAll
          totalCurrentMonth
          deletedCurrentMonth
          recordingCounts {
            siteId
            count
            dateKey
          }
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
        createdAt {
          iso8601
          niceDateTime
        }
        lastActivityAt {
          iso8601
          niceDateTime
        }
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
              verifiedAt {
                iso8601
                niceDateTime
              }
              plan {
                planId
                name
                free
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
            issuedAt {
              iso8601
              niceDateTime
            }
            dueAt {
              iso8601
              niceDateTime
            }
            paidAt {
              iso8601
              niceDateTime
            }
          }
          allTimeCommission {
            id
            amount
            currency
            siteId
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
        createdAt {
          iso8601
          niceDateTime
        }
        provider
        lastActivityAt {
          iso8601
          niceDateTime
        }
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
