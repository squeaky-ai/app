import { gql } from '@apollo/client';

export const GET_ANALYTICS_TRAFFIC_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $pagesPage: Int!, $pagesSort: AnalyticsPagesSort) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
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
          total
          trend
          items {
            dateKey
            count
          }
        }
        pages(size: 10, page: $pagesPage, sort: $pagesSort) {
          items {
            url
            averageDuration
            viewCount
            viewPercentage
            exitRatePercentage
            bounceRatePercentage
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
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $referrersPage: Int!, $browsersPage: Int!, $browsersSort: AnalyticsBrowsersSort!) { 
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
        browsers(size: 10, page: $browsersPage, sort: $browsersSort) {
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
            duration
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

export const GET_ANALYTICS_PAGE_TRAFFIC_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $page: String!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        perPage(page: $page) {
          averageTimeOnPage {
            average
            trend
          }
          averageVisitsPerSession {
            average
            trend
          }
          bounceRate {
            average
            trend
          }
          exitRate {
            average
            trend
          }
          pageViews {
            groupType
            groupRange
            total
            trend
            items {
              dateKey
              count
            }
          }
          visitsAt {
            day
            hour
            count
          }
        }
      }
    }
  }
`;

export const GET_ANALYTICS_PAGE_AUDIENCE_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!, $referrersPage: Int!, $page: String!, $browsersPage: Int!, $browsersSort: AnalyticsBrowsersSort!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        perPage(page: $page) {
          languages {
            name
            count
          }
          countries {
            name
            code
            count
          }
          browsers(size: 10, page: $browsersPage, sort: $browsersSort) {
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
          dimensions {
            deviceX
            count
          }
          devices {
            type
            count
          }
          referrers(size: 10, page: $referrersPage) {
            items {
              referrer
              duration
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
  }
`;
