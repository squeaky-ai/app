import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import { 
  SitesQueryResponse, 
  SiteQueryResponse, 
  SiteMutationResponse, 
  SiteMutationInput 
} from '../../types/site';

import { 
  TeamInviteInput,
  TeamInviteCancelInput, 
  TeamInviteResendInput, 
  TeamUpdateInput, 
  TeamLeaveInput, 
  TeamDeleteInput
} from '../../types/team';

import { 
  UserMutationInput, 
  UserMutationResponse 
} from '../../types/user';

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
      query: gql`
        query GetSites {
          sites {
            id
            name
            url
            avatar
            planName
            ownerName
          }
        }
      `,
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
      query: gql`
        query GetSite($id: ID!) {
          site(id: $id) {
            id
            name
            url
            avatar
            planName
            ownerName
            team {
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
            recordings {
              items {
                id
                active
                locale
                duration
                startPage
                exitPage
                pageCount
                useragent
                viewportX
                viewportY
                viewerId
              }
              pagination {
                cursor
                isLast
                pageSize
              }
            }
          }
        }
      `,
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
      mutation: gql`
        mutation SiteCreate($input: SiteCreateInput!) {
          siteCreate(input: $input) {
            id
            name
            url
          }
        }
      `,
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
      mutation: gql`
        mutation SiteUpdate($input: SiteUpdateInput!) {
          siteUpdate(input: $input) {
            id
            name
            url
          }
        }
      `,
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
      mutation: gql`
        mutation UserUpdate($input: UserUpdateInput!) {
          userUpdate(input: $input) {
            id
            firstName
            lastName
            email
          }
        }
      `,
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
      mutation: gql`
        mutation TeamInvite($input: TeamInviteInput!) {
          teamInvite(input: $input) {
            id
            team {
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
        }
      `,
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
      mutation: gql`
        mutation TeamInviteCancel($input: TeamInviteCancelInput!) {
          teamInviteCancel(input: $input) {
            id
            team {
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
        }
      `,
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
      mutation: gql`
        mutation TeamInviteResend($input: TeamInviteResendInput!) {
          teamInviteResend(input: $input) {
            id
            team {
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
        }
      `,
      variables: { input }
    });

    return { site: data.teamInviteResend };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};

export const teamUpdate = async (input: TeamUpdateInput): Promise<SiteMutationResponse> => {
  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation TeamUpdate($input: TeamUpdateInput!) {
          teamUpdate(input: $input) {
            id
            team {
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
        }
      `,
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
      mutation: gql`
        mutation TeamDelete($input: TeamDeleteInput!) {
          teamDelete(input: $input) {
            id
            team {
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
        }
      `,
      variables: { input }
    });

    return { site: data.teamDelete };
  } catch(error) {
    console.error(error);
    return parseGraphQLError(error);
  }
};
