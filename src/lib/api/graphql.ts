import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { SitesQueryResponse, SiteQueryResponse, SiteMutationResponse } from '../../types/site';
import { UserMutationInput, UserMutationResponse } from '../../types/user';

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