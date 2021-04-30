import { ApolloServer, Config } from 'apollo-server';

import * as database from './config/database';

import { context } from './context';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

import { AuthAPI } from './datasources/auth';
import { UserAPI } from './datasources/user';

const dataSources = () => ({
  authAPI: new AuthAPI(),
  userAPI: new UserAPI(),
});

// Export this so it can be pulled into the test client
export const config: Config = { 
  typeDefs, 
  resolvers,
  dataSources,
  context,
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
