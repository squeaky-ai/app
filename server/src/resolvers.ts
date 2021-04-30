export const resolvers = {
  Query: {
    /**
     * Get the current user that is included in the bearer token
     */
    me: async (_parent: any, _args: any, { dataSources }: any) => {
      return dataSources.userAPI.get();
    }
  },
  Mutation: {
    /**
     * Send an email to the user that includes their one-time-password
     */
    authRequest: (_parent: any, { email, authType }: any, { dataSources }: any) => {
      return dataSources.authAPI.request(email, authType);
    },
    /**
     * Verify that the one-time-password matches what we have stored
     */
    authVerification: (_parent: any, { email, token, authType }: any, { dataSources }: any) => {
      return dataSources.authAPI.verify(email, token, authType);
    },
  }
};
