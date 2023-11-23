import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query User {
    user {
      id
      firstName
      lastName
      fullName
      email
      superuser
      provider
      partner {
        id
        name
        slug
      }
      changelogLastViewedAt {
        iso8601
      }
    }
  }
`;

export const USER_INVITATION_QUERY = gql`
  query UserInvitation($token: String!) {
    userInvitation(token: $token) {
      email
      hasPending
    }
  }
`;

export const GET_COMMUNICATION_QUERY = gql`
  query UserCommunication{
    user {
      id
      communication {
        id
        onboardingEmail
        weeklyReviewEmail
        monthlyReviewEmail
        productUpdatesEmail
        marketingAndSpecialOffersEmail
        knowledgeSharingEmail
        feedbackEmail
      }
    }
  }
`;


export const GET_PARTNER_QUERY = gql`
  query UserParnter {
    user {
      id
      partner {
        id
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
              free
              enterprise
              name
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
`;
