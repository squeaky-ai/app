import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import {
  SitesQueryResponse,
  SiteMutationResponse, 
  SiteMutationInput,
  SiteDeleteMutationInput,
  SiteVerifyMutationInput
} from 'types/site';

import {
  GET_SITES_QUERY
} from 'data/sites/queries';

import { 
  CREATE_SITE_MUTATION, 
  UPDATE_SITE_MUTATION,
  DELETE_SITE_MUTATION,
  VERIFY_SITE_MUTATION
} from 'data/sites/mutations';

import { 
  TeamInviteInput,
  TeamInviteCancelInput, 
  TeamInviteResendInput,
  TeamUpdateInput, 
  TeamInviteAcceptInput,
  TeamLeaveInput, 
  TeamDeleteInput,
} from 'types/team';

import { 
  TEAM_INVITE_MUTATION, 
  TEAM_INVITE_CANCEL_MUTATION, 
  TEAM_INVITE_ACCEPT_MUTATION,
  TEAM_INVITE_RESEND_MUTATION,
  TEAM_UPDATE_MUTATION,
  TEAM_DELETE_MUTATION
} from 'data/teams/mutations';

import { 
  UserMutationInput, 
  UserMutationResponse,
  UserPasswordMutationInput,
  UserInvitationQueryResponse
} from 'types/user';

import { 
  USER_INVITATION_QUERY
} from 'data/users/queries';

import { 
  UPDATE_USER_MUTATION,
  USER_DELETE_MUTATION,
  USER_PASSWORD_MUTATION
} from 'data/users/mutations';

import {
  CREATE_TAG_MUTATION,
  DELETE_TAG_MUTATION
} from 'data/recordings/mutations';

import {
  TagCreateMutationInput,
  TagDeleteMutationInput
} from 'types/recording';

const ACCEPT_INCOMING = <E, I>(_existing: E, incoming: I[]): I[] => [...incoming];

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        sites: { merge: ACCEPT_INCOMING }
      },
    },
    Site: {
      fields: {
        team: { merge: ACCEPT_INCOMING }
      }
    }
  }
});

export const client = new ApolloClient({
  cache,
  uri: '/api/graphql',
  ssrMode: typeof window === 'undefined',
});

interface ErrorResponse {
  error: { [key: string]: string }
}

const parseGraphQLError = (error: Error): ErrorResponse => {
  const parts = error.message.split(' ');
  const key = parts[0].toLowerCase();
  const value = parts.slice(1).join(' ');
  return { error: { [key]: value } };
};

export const createSite = async (name: string, url: string): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_SITE_MUTATION,
      variables: { input: { name, url } },
    });

    const { sites } = cache.readQuery<SitesQueryResponse>({ query: GET_SITES_QUERY });

    cache.writeQuery({
      query: GET_SITES_QUERY,
      data: { sites: [...sites, data.siteCreate] }
    });

    return { site: data.siteCreate };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const updateSite = async (input: SiteMutationInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_SITE_MUTATION,
      variables: { input }
    });

    return { site: data.siteUpdate };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const deleteSite = async (input: SiteDeleteMutationInput): Promise<SiteMutationResponse> => {
  try {
    await client.mutate({
      mutation: DELETE_SITE_MUTATION,
      variables: { input }
    });

    const { sites } = cache.readQuery<SitesQueryResponse>({ query: GET_SITES_QUERY });

    cache.writeQuery({
      query: GET_SITES_QUERY,
      data: { sites: sites.filter(site => site.id !== input.siteId) }
    });

    return { site: null };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const verifySite = async (input: SiteVerifyMutationInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: VERIFY_SITE_MUTATION,
      variables: { input }
    });

    return { site: data.siteVerify };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const updateUser = async (input: UserMutationInput): Promise<UserMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_USER_MUTATION,
      variables: { input }
    });

    return { user: data.userUpdate };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamInvite = async (input: TeamInviteInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: TEAM_INVITE_MUTATION,
      variables: { input }
    });

    return { site: data.teamInvite };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamInviteCancel = async (input: TeamInviteCancelInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: TEAM_INVITE_CANCEL_MUTATION,
      variables: { input }
    });

    return { site: data.teamInviteCancel };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamInviteAccept = async (input: TeamInviteAcceptInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: TEAM_INVITE_ACCEPT_MUTATION,
      variables: { input }
    });

    return { site: data.teamInviteCancel };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamInviteResend = async (input: TeamInviteResendInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: TEAM_INVITE_RESEND_MUTATION,
      variables: { input }
    });

    return { site: data.teamInviteResend };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const userInvitation = async (token: string): Promise<UserInvitationQueryResponse> => {
  try {
    const { data } = await client.query({
      query: USER_INVITATION_QUERY,
      variables: { token }
    });

    return data.userInvitation;
  } catch(error) {
    console.error(error);
    return { email: null, hasPending: false };
  }
};

export const userDelete = async (): Promise<boolean> => {
  try {
    await client.mutate({ mutation: USER_DELETE_MUTATION });
    return true;
  } catch(error) {
    console.error(error);
    return false;
  }
};

export const userPassword = async (input: UserPasswordMutationInput): Promise<UserMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: USER_PASSWORD_MUTATION,
      variables: { input }
    });
    return { user: data.userPassword };
  } catch(error) {
    console.error(error);
    return { error: { currentPassword: error.message } };
  }
}

export const teamUpdate = async (input: TeamUpdateInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: TEAM_UPDATE_MUTATION,
      variables: { input }
    });

    return { site: data.teamUpdate };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamLeave = async (input: TeamLeaveInput): Promise<SiteMutationResponse> => {
  try {
    await client.mutate({
      mutation: gql`
        mutation TeamLeave($input: TeamLeaveInput!) {
          teamLeave(input: $input) {
            id
          }
        }
      `,
      variables: { input }
    });

    return { site: null };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamDelete = async (input: TeamDeleteInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: TEAM_DELETE_MUTATION,
      variables: { input }
    });

    return { site: data.teamDelete };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const tagCreate = async (input: TagCreateMutationInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_TAG_MUTATION,
      variables: input
    });

    return { site: data.tagCreate };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const tagDelete = async (input: TagDeleteMutationInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_TAG_MUTATION,
      variables: input
    });

    return { site: data.tagDelete };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};
