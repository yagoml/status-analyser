import { GraphQLServer } from 'graphql-yoga'
import path from 'path'
import resolvers from './src/resolvers'

const server = new GraphQLServer({
  typeDefs: path.resolve(__dirname, 'src/schema.graphql'),
  resolvers
})

module.exports = server