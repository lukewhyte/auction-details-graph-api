import express from 'express'
import cors from 'cors'
import { logger } from './winston'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import http from 'http';
import typeDefs from './typeDefs/main';
import resolvers from './resolvers/main';

async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
      logger.error(err)
      return new Error('An Error Occured')
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  
  await server.start()

  app.use('/', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startApolloServer();
