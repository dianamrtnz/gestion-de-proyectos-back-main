import express from 'express';
import cors from 'cors';
import pkg from 'apollo-server-express';
const { ApolloServer } = pkg;
import dotenv from 'dotenv';
import conectarBD from './db/db.js';
import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';
import { validateToken } from './utils/tokenUtils.js';

dotenv.config();

const getUserData = (token) => {
  const verificacion = validateToken(token.split(' ')[1]);
  if (verificacion.data) {
    return verificacion.data;
  } else {
    return null;
  }
};

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
  context: ({ req, res }) => {
    //const token = req.headers?.authorization ?? null;
    let token = null;
    if (req.headers.authorization){
      token=req.headers.authorization;
    }

    if (token) {
      const userData = getUserData(token);
      console.log('user data', userData);
      if (userData) {
        return { userData };
      }
    }
    return null;
  },
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
  await conectarBD();
  await server.start();

  server.applyMiddleware({ app });

  console.log('servidor listo');
});
