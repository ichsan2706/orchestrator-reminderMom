const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const parentsSchema = require('./schema/parents-schema')
const kiaSchema = require('./schema/kia-schema')
const schema = makeExecutableSchema ({
    typeDefs: [parentsSchema.typeDefs, kiaSchema.typeDefs ],
    resolvers: [parentsSchema.resolvers, kiaSchema.resolvers]
})

const server = new ApolloServer({schema});

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });