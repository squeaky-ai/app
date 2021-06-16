import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { 
  SitesQueryResponse, 
  SiteQueryResponse, 
  SiteMutationResponse, 
  SiteMutationInput 
} from '../../types/site';

import { 
  GET_SITES_QUERY, 
  GET_SITE_QUERY 
} from '../../data/sites/queries';

import { 
  CREATE_SITE_MUTATION, 
  UPDATE_SITE_MUTATION
} from '../../data/sites/mutations';

import { 
  TeamInviteInput,
  TeamInviteCancelInput, 
  TeamInviteResendInput,
  TeamUpdateInput, 
  TeamInviteAcceptInput,
  TeamLeaveInput, 
  TeamDeleteInput,
} from '../../types/team';

import { 
  TEAM_INVITE_MUTATION, 
  TEAM_INVITE_CANCEL_MUTATION, 
  TEAM_INVITE_ACCEPT_MUTATION,
  TEAM_INVITE_RESEND_MUTATION,
  TEAM_UPDATE_MUTATION,
  TEAM_DELETE_MUTATION
} from '../../data/teams/mutations';

import { 
  User,
  UserMutationInput, 
  UserMutationResponse 
} from '../../types/user';

import { 
  USER_INVITATION_QUERY 
} from '../../data/users/queries';

import { 
  UPDATE_USER_MUTATION 
} from '../../data/users/mutations';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

const parseGraphQLError = (error: Error): { [key: string]: string } => {
  const parts = error.message.split(' ');
  const key = parts[0].toLowerCase();
  const value = parts.slice(1).join(' ');
  return { [key]: value };
};

export const getSites = async (): Promise<SitesQueryResponse> => {
  try {
    const { data } = await client.query<SitesQueryResponse>({
      query: GET_SITES_QUERY
    });

    return data;
  } catch(error) {
    console.error(error);
    return { sites: [] };
  }
};

export const getSite = async (id: string): Promise<SiteQueryResponse> => {
  try {
    const { data } = await client.query<SiteQueryResponse>({
      query: GET_SITE_QUERY,
      variables: { id },
    });

    return data;
  } catch(error) {
    console.error(error);
    return { site: null };
  }
};

export const createSite = async (name: string, url: string): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_SITE_MUTATION,
      variables: { input: { name, url } },
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

export const userInvitation = async (token: string): Promise<User | null> => {
  try {
    const { data } = await client.query({
      query: USER_INVITATION_QUERY,
      variables: { token }
    });

    return data.userInvitation;
  } catch(error) {
    console.error(error);
    return null;
  }
};

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
