import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { SitesQueryResponse } from 'types/site';

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