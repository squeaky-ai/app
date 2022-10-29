import { gql } from '@apollo/client';

// Oh lordy it's thicc
export const GET_DASHBOARD_QUERY = gql`
  query GetDashboard($siteId: ID!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) { 
    site(siteId: $siteId) {
      id
      analytics(fromDate: $fromDate, toDate: $toDate) {
        bounceRate {
          average
          trend
        }
        bounces(size: 3) {
          url
          percentage
        }
        exits(size: 3) {
          url
          percentage
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
          }
        }
        recordings {
          groupType
          groupRange
          items {
            dateKey
            count
          }
        }
        bounceCounts {
          groupType
          groupRange
          items {
            dateKey
            viewCount
            bounceRateCount
          }
        }
        recordingsCount {
          total
          new
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
      }
      errors(size: 5, sort: error_count__desc, fromDate: $fromDate, toDate: $toDate) {
        items {
          id
          message
          errorCount
        }
      }
      errorsCounts(fromDate: $fromDate, toDate: $toDate) {
        groupType
        groupRange
        items {
          dateKey
          count
        }
      }
      recordingsHighlights(fromDate: $fromDate, toDate: $toDate) {
        eventful {
          id
          sessionId
          disconnectedAt
        }
        longest {
          id
          sessionId
          duration
        }
      }
      visitorsHighlights(fromDate: $fromDate, toDate: $toDate) {
        active {
          id
          visitorId
          recordingCount {
            total
          }
        }
        newest {
          id
          visitorId
          createdAt
        }
      }
    }
  }
`;
