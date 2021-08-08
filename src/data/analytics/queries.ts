import { gql } from '@apollo/client';

export const GET_ANALYTICS_QUERY = gql`
  query GetAnalytics($siteId: ID!, $fromDate: String!, $toDate: String!) { 
    site(siteId: $siteId) {
      id
      analytics {
        visitors(fromDate: $fromDate, toDate: $toDate)
        pageViews(fromDate: $fromDate, toDate: $toDate)
        averageSessionDuration(fromDate: $fromDate, toDate: $toDate)
        pagesPerSession(fromDate: $fromDate, toDate: $toDate)
        pageViewsRange(fromDate: $fromDate, toDate: $toDate) {
          date
          pageViewCount
        }
        pages(fromDate: $fromDate, toDate: $toDate) {
          path
          count
        }
        browsers(fromDate: $fromDate, toDate: $toDate) {
          name
          count
        }
        languages(fromDate: $fromDate, toDate: $toDate) {
          name
          count
        }
        devices(fromDate: $fromDate, toDate: $toDate) {
          type
          count
        }
        dimensions(fromDate: $fromDate, toDate: $toDate) {
          min
          max
          avg
        }
      }
    }
  }
`;
