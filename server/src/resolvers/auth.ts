import { Context } from '../context';

interface AuthRequestArgs {
  email: string;
  authType: 'LOGIN' | 'SIGNUP';
}

interface AuthVerifyArgs {
  email: string;
  token: string;
}

export const authResolvers = {
  Mutation: {
    /**
     * Send an email to the user that includes their one-time-password
     */
    authRequest: (_parent: any, { email, authType }: AuthRequestArgs, { dataSources }: Context) => {
      return dataSources.authAPI.request(email, authType);
    },
    /**
     * Verify that the one-time-password matches what we have stored
     */
    authVerify: (_parent: any, { email, token }: AuthVerifyArgs, { dataSources }: Context) => {
      return dataSources.authAPI.verify(email, token);
    },
  }
};
