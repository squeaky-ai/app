import fs from 'fs';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';

const typeDefs = fs.readFileSync(__dirname + '/schema.graphql').toString();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
