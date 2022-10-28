import { gql } from '@apollo/client';

export const GET_DASHBOARD_QUERY = gql`
  query GetDashboard($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        pageViewCount
        bounceRate {
          average
          trend
        }
        bounces(size: 5) {
          url
          percentage
        }
        exits(size: 5) {
          url
          percentage
        }
        pages(size: 5, page: 1, sort: views__desc) {
          items {
            url
            averageDuration
            viewCount
            viewPercentage
            exitRatePercentage
            bounceRatePercentage
          }
        }
      }
    }
  }
`;
