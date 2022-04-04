import { gql } from '@apollo/client';

export const GET_ANALYTICS_TRAFFIC_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $pagesPage: Int!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
        visitsAt {
          day
          hour
          count
        }
        sessionDurations {
          average
          trend
        }
        pagesPerSession {
          average
          trend
        }
        sessionsPerVisitor {
          average
          trend
        }
        visitorsCount {
          total
          new
        }
        visitors {
          groupType
          groupRange
          items {
            dateKey
            allCount
            existingCount
            newCount
          }
        }
        pageViews {
          groupType
          groupRange
          items {
            dateKey
            totalCount
            uniqueCount
          }
        }
        pages(size: 10, page: $pagesPage) {
          items {
            path
            count
            avg
            percentage
          }
          pagination {
            total
            pageSize
          }
        }
      }
    }
  }
`;

export const GET_ANALYTICS_AUDIENCE_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $browsersPage: Int!, $referrersPage: Int!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        visitors {
          groupType
          groupRange
          items {
            dateKey
            allCount
            existingCount
            newCount
          }
        }
        dimensions {
          deviceX
          count
        }
        browsers(size: 5, page: $browsersPage) {
          items {
            browser
            count
            percentage
          }
          pagination {
            total
            pageSize
          }
        }
        languages {
          name
          count
        }
        countries {
          name
          code
          count
        }
        devices {
          type
          count
        }
        referrers(size: 10, page: $referrersPage) {
          items {
            referrer
            count
            percentage
          }
          pagination {
            total
            pageSize
          }
        }
      }
    }
  }
`;
