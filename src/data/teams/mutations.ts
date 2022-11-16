import { gql } from '@apollo/client';

export const TEAM_INVITE_MUTATION = gql`
  mutation TeamInvite($input: TeamInviteInput!) {
    teamInvite(input: $input) {
      id
      role
      status
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;

export const TEAM_INVITE_CANCEL_MUTATION = gql`
  mutation TeamInviteCancel($input: TeamInviteCancelInput!) {
    teamInviteCancel(input: $input) {
      id
      role
      status
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;

export const TEAM_INVITE_ACCEPT_MUTATION = gql`
  mutation TeamInviteAccept($input: TeamInviteAcceptInput!) {
    teamInviteAccept(input: $input) {
      id
      role
      status
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;

export const TEAM_INVITE_RESEND_MUTATION = gql`
  mutation TeamInviteResend($input: TeamInviteResendInput!) {
    teamInviteResend(input: $input) {
      id
      role
      status
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;

export const TEAM_UPDATE_ROLE_MUTATION = gql`
  mutation TeamUpdateRole($input: TeamUpdateRoleInput!) {
    teamUpdateRole(input: $input) {
      id
      role
      status
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;

export const TEAM_UPDATE_MUTATION = gql`
  mutation TeamUpdate($input: TeamUpdateInput!) {
    teamUpdate(input: $input) {
      id
      linkedDataVisible
    }
  }
`;

export const TEAM_LEAVE_MUTATION = gql`
  mutation TeamLeave($input: TeamLeaveInput!) {
    teamLeave(input: $input) {
      id
    }
  }
`;

export const TEAM_DELETE_MUTATION = gql`
  mutation TeamDelete($input: TeamDeleteInput!) {
    teamDelete(input: $input) {
      id
      role
      status
      user {
        id
        firstName
        lastName
        fullName
        email
      }
    }
  }
`;
