import { gql } from '@apollo/client';

export const GET_SENTIMENT_QUERY = gql`
  query GetSentiment($siteId: ID!, $page: Int!, $size: Int!, $sort: SentimentResponseSort!, $fromDate: String!, $toDate: String!) {
    site(siteId: $siteId) {
      id
      sentiment(fromDate: $fromDate, toDate: $toDate) {
        responses(page: $page, size: $size, sort: $sort) {
          items {
            id
            score
            comment
            visitor {
              id
              visitorId
            }
            sessionId
            recordingId
            timestamp
          }
          pagination {
            pageSize
            total
            sort
          }
        }
        replies {
          total
          responses {
            score
          }
        }
        ratings {
          score
          trend
          responses {
            score
            timestamp
          }
        }
      }
    }
  }
`;
