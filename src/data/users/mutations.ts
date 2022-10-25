import { gql } from '@apollo/client';

export const UPDATE_USER_MUTATION = gql`
  mutation UserUpdate($input: UsersUpdateInput!) {
    userUpdate(input: $input) {
      id
      firstName
      lastName
    }
  }
`;

export const USER_DELETE_MUTATION = gql`
  mutation UserDelete {
    userDelete(input: {}) {
      id
    }
  }
`;

export const USER_PASSWORD_MUTATION = gql`
  mutation UserPassword($input: UsersPasswordInput!) {
    userPassword(input: $input) {
      id
    }
  }
`;

export const USER_CREATE_REFERRAL_MUTATION = gql`
  mutation UserCreateReferral($input: UsersReferralCreateInput!) {
    userReferralCreate(input: $input) {
      id
      url
    }
  }
`;

export const UPDATE_USER_COMMUNICATION = gql`
  mutation UserCommunication($input: UsersCommunicationInput!) {
    userCommunication(input: $input) {
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

export const ADMIN_USER_DELETE_MUTATION = gql`
  mutation AdminUserDelete($input: AdminUserDeleteInput!) {
    adminUserDelete(input: $input) {
      id
    }
  }
`;

export const ADMIN_REFERRAL_DELETE_MUTATION = gql`
  mutation AdminReferralDelete($input: AdminReferralDeleteInput!) {
    adminReferralDelete(input: $input) {
      id
    }
  }
`;

export const ADMIN_USER_PARTNER_CREATE_MUTATION = gql`
  mutation AdminUserPartnerCreate($input: AdminUserPartnerCreateInput!) {
    adminUserPartnerCreate(input: $input) {
      id
      partner {
        id
        name
        slug
      }
    }
  }
`;

export const ADMIN_PARTNER_INVOICE_UPDATE = gql`
  mutation AdminPartnerInvoiceUpdate($input: AdminPartnerInvoiceUpdateInput!) {
    adminPartnerInvoiceUpdate(input: $input) {
      id
      status
    }
  }
`;

export const USER_REFERRAL_DELETE_MUTATION = gql`
  mutation UserReferralDelete($input: UsersReferralDeleteInput!) {
    userReferralDelete(input: $input) {
      id
    }
  }
`;
