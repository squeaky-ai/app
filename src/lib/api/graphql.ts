import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { SitesQueryResponse, SiteQueryResponse } from 'types/site';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined',
});

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