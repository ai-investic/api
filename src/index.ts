import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';

import {typeDefs} from './Schema/Type/types';
import {resolvers} from './Schema/Resolver/resolvers';

interface MyContext {
  token?: String;
}

(async () => {
  dotenv.config();

  const e: NodeJS.ProcessEnv = process.env;

  (async () => await mongoose.connect(String(e.MONGO_URI)))()
    .then(async () => {
      const app = express();
      const httpServer = http.createServer(app);

      const apollo = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        csrfPrevention: false,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
      });

      await apollo.start();

      app.use(
        '/',
        cors<cors.CorsRequest>(),
        bodyParser.json({limit: '50mb'}),
        expressMiddleware(apollo, {
          context: async ({req}) => ({token: req.headers.token}),
        }),
      );

      await new Promise<void>(resolve => httpServer.listen({port: Number(e.API_PORT)}, resolve));

      console.log(`🚀 Server ready at http://localhost:${e.API_PORT}/`);
    })
    .catch(error => console.error(error))
  ;
})();
