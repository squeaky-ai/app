import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $pagesPage: Int!, $browsersPage: Int!, $referrersPage: Int!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
        dimensions {
          deviceX
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
          total
          unique
          timestamp
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
        browsers(size: 10, page: $browsersPage) {
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
