import { gql } from '@apollo/client';

export const GET_SENTIMENT_QUERY = gql`
  query GetSentiment($siteId: ID!, $page: Int!, $size: Int!, $sort: FeedbackSentimentResponseSort!, $fromDate: ISO8601Date!, $toDate: ISO8601Date!) {
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
            device {
              viewportX
              viewportY
              browserName
              browserDetails
              deviceType
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
