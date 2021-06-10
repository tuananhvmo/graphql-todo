import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import connectDB from './config/db.js';
import { resolvers } from './Schema/Resolvers.js';
import { typeDefs } from './Schema/TypeDefs.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(5000, () => {
  console.log('Server is running');
});
