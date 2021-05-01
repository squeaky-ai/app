import { ApolloServer, Config, IResolvers } from 'apollo-server';

import * as database from './config/database';

import { context } from './context';
import { typeDefs } from './schema';

import { AuthAPI } from './datasources/auth';
import { UserAPI } from './datasources/user';

import { authResolvers } from './resolvers/auth';
import { userResolvers } from './resolvers/user';

const dataSources = () => ({
  authAPI: new AuthAPI(),
  userAPI: new UserAPI(),
});

const resolvers: IResolvers[] = [
  authResolvers, 
  userResolvers,
];

// Export this so it can be pulled into the test client
export const config: Config = { 
  dataSources,
  context,
  resolvers,
  typeDefs,
};

const server = new ApolloServer(config);

// Only start the server when it is not under test, otherwise 
// Jest will need to start/stop the server for every test
if (process.env.NODE_ENV !== 'test') {
  server.listen().then(async ({ url }) => {
    await database.init();

    console.log(`🚀  Server ready at ${url}`);
  });
}
