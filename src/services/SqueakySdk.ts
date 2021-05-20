import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { SessionInfo } from 'components/SqueakyPage';
import SESSION from 'config/session';
import { requestTokenMutation, verifyTokenMutation } from 'data/users/mutations';
import type { RequestAuthMutationResponse, VerifyAuthMutationResponse } from 'data/users/types';

/** This SDK handles most communication with the Squeaky GraphQL Api */
export default class SqueakySdk {
  /** The HTTP client to directly communicate with the API */
  public readonly client: ApolloClient<NormalizedCacheObject>;

  /** JWT token used to identify the current client with the API */
  private jwtToken: string;

  /** Expiration time for the JWT token as indicated by the backend */
  private tokenExpiresAt: string;

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

  /** Creates a session by storing information about it in the localStorage */
  public createSession(): void {
    // creates the session info object
    const sessionInfo: SessionInfo = {
      expiresAt: this.tokenExpiresAt,
      jwt: this.jwtToken,
    };

    // stores the information
    localStorage.setItem(SESSION.key, JSON.stringify(sessionInfo));
  }

  /** Detroys the current session by removing information from the localStorage */
  public destroySession(): void {
    localStorage.clear();
  }

  /** Requests the backend to send an email with the auth token to the user */
  public async requestAuth(
    authType: 'LOGIN' | 'SIGNUP',
    email: string,
  ): Promise<RequestAuthMutationResponse | null> {
    try {
      const { data } = await this.client.mutate<RequestAuthMutationResponse>({
        mutation: requestTokenMutation,
        variables: { input: { authType, email } },
      });

      return data;
    } catch {
      return null;
    }
  }

  /** Verifies the token entered by the user to authenticate them */
  public async verifyAuth(
    email: string,
    token: string,
  ): Promise<VerifyAuthMutationResponse | null> {
    try {
      // verifies the token with the backend
      const { data } = await this.client.mutate<VerifyAuthMutationResponse>({
        mutation: verifyTokenMutation,
        variables: { input: { email, token } },
      });

      // stores JWT + Expiration timestamp
      const { expiresAt, jwt } = data.authVerify;
      this.jwtToken = jwt;
      this.tokenExpiresAt = expiresAt;

      // creates the session
      this.createSession();

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
