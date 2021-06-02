import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloLink, ApolloClient, HttpLink, InMemoryCache, concat } from '@apollo/client';
import type { SessionInfo } from 'components/SqueakyPage';
import SESSION from 'config/session';
import { requestTokenMutation, verifyTokenMutation } from 'data/users/mutations';
import { getSitesQuery, getSiteQuery } from 'data/sites/queries';
import { SiteCreateMutation } from 'data/sites/mutations';
import type { RequestAuthMutationResponse, VerifyAuthMutationResponse } from 'data/users/types';
import type { SitesQueryResponse, SiteQueryResponse } from 'data/sites/types';

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

    // early-termination if we're server-side
    if (typeof window === 'undefined') return;

    // retrives the jwt token from the localStorage when available
    const sessionInfo = this.getSession();

    // early-termination if there is no session information
    if (!sessionInfo) return;

    // stores info in the object
    this.jwtToken = sessionInfo.jwt;
    this.tokenExpiresAt = sessionInfo.expiresAt;
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

  /** Fetches the information about the session in the localStorage */
  public getSession(): SessionInfo {
    const sessionInfo = JSON.parse(localStorage.getItem(SESSION.key)) as SessionInfo;

    return sessionInfo;
  }

  /** Detroys the current session by removing information from the localStorage */
  public destroySession(): void {
    localStorage.clear();
  }

  /** Returns the registered JWT token */
  public getToken(): string {
    return this.jwtToken;
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

  /** Get the basic list of sites for a user */
  public async getSites(): Promise<SitesQueryResponse> {
    try {
      const { data } = await this.client.query<SitesQueryResponse>({
        query: getSitesQuery,
      });

      return data;
    } catch(error) {
      console.error(error);
      return { sites: [] };
    }
  }

  /** Get the full site by it's id */
  public async getSite(id: string): Promise<SiteQueryResponse> {
    try {
      const { data } = await this.client.query<SiteQueryResponse>({
        query: getSiteQuery,
        variables: { id },
      });

      return data;
    } catch(error) {
      console.error(error);
      return { site: null };
    }
  } 

  public async createSite(name: string, url: string): Promise<SiteQueryResponse> {
    try {
      const { data } = await this.client.mutate<SiteQueryResponse>({
        mutation: SiteCreateMutation,
        variables: { input: { name, url } },
      });

      return data;
    } catch(error) {
      console.error(error);
      return null;
    }
  }

  /** Creates the ApolloClient linked to the Squeaky API */
  private createClient(): ApolloClient<NormalizedCacheObject> {
    const httpLink = new HttpLink({ uri: 'https://dev.squeaky.ai/graphql' });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: {
          Authorization: this.jwtToken ? `Bearer ${this.jwtToken}` : null,
        }
      });

      return forward(operation);
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: concat(authMiddleware, httpLink),
      ssrMode: typeof window === 'undefined',
    });
  }
}
