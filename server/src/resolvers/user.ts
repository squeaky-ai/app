import { Context } from '../context';

interface MeArgs {}

export const userResolvers = {
  Query: {
    /**
     * Get the current user that is included in the bearer token
     */
    me: async (_parent: any, _args: MeArgs, { dataSources }: Context) => {
      return dataSources.userAPI.get();
    },
  }
};
