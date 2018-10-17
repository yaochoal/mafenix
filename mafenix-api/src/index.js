
import graphQLSchema from './graphQLSchema';
import { formatErr } from './utilities';
import { GraphQLServer } from "graphql-yoga";

const options = {
  port: 5500,
  endpoint: '/graphql',
  subscriptions: '/graphql',
  playground: '/graphiql',
  cors: {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
}

const server = new GraphQLServer({ schema:  graphQLSchema });
server.start(options, ({ port }) =>{
  console.log(`Server started, listening on port ${port} for incoming requests.`,)},)
