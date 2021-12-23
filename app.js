const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const parentsSchema = require('./schema/parents-schema')

const schema = makeExecutableSchema ({
    typeDefs: [parentsSchema.typeDefs],
    resolvers: [parentsSchema.resolvers]
})

const server = new ApolloServer({schema});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });