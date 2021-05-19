import type { NormalizedCacheObject } from '@apollo/client';
import { gql, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

/** This SDK handles most communication with the Squeaky GraphQL Api */
export default class SqueakySdk {
  /** The HTTP client to directly communicate with the API */
  public readonly client: ApolloClient<NormalizedCacheObject>;

  /** JWT token used to identify the current client with the API */
  public readonly jwtToken: string | null = null;

  constructor(initialState: NormalizedCacheObject | null = null) {
    // creates the API client
    this.client = this.createClient();

    // if your page has Next.js data fetching methods that use Apollo Client, the initial state gets hydrated here
    if (initialState) {
      // get the existing cache, loaded during client side data fetching
      const existingCache = this.client.extract();

      // restore the cache using the data passed from getStaticProps/getServerSideProps combined with the existing cached data
      this.client.cache.restore({ ...existingCache, ...initialState });
    }
  }

  /** Requests the backend to send an email with the auth token to the user */
  public async requestAuth<T = { authRequest: { emailSentAt: string } }>(
    authType: 'LOGIN' | 'SIGNUP',
    email: string,
  ): Promise<T | null> {
    try {
      const { data } = await this.client.mutate<T>({
        mutation: gql`
          mutation RequestToken($input: AuthRequestInput!) {
            authRequest(input: $input) {
              emailSentAt
            }
          }
        `,
        variables: { input: { authType, email } },
      });

      return data;
    } catch {
      return null;
    }
  }

  /** Verifies the token entered by the user to authenticate them */
  public async verifyAuth<
    T = { authVerify: { expiresAt: string; jwt: string; user: { email: string } } }
  >(email: string, token: string): Promise<T | null> {
    try {
      // verifies the token with the backend
      const { data } = await this.client.mutate<T>({
        mutation: gql`
          mutation VerifyToken($input: AuthVerifyInput!) {
            authVerify(input: $input) {
              expiresAt
              jwt
              user {
                email
              }
            }
          }
        `,
        variables: { input: { email, token } },
      });

      return data;
    } catch {
      return null;
    }
  }

  /** Creates the ApolloClient linked to the Squeaky API */
  private createClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        headers: this.jwtToken
          ? {
              Authorization: `Bearer ${this.jwtToken}`,
            }
          : {},
        uri: 'https://dev.squeaky.ai/graphql',
      }),
      ssrMode: typeof window === 'undefined',
    });
  }
}
