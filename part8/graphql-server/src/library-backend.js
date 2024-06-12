const { ApolloServer } = require('@apollo/server');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { expressMiddleware } = require('@apollo/server/express4');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('node:path');

const { User } = require('./schema.js');
const { typeDefs } = require('./typeDefs.js');
const { resolvers } = require('./resolvers.js');

// To load process.env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'library' })
  .then(() => {
    console.log('Sucessfully connected to MongoDB.');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({ server: httpServer, path: '/' });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const encodedToken = auth.substring(7);
          const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET);
          const foundUser = await User.findById(decodedToken.id);
          return { currentUser: foundUser };
        }
      },
    })
  );

  httpServer.listen(4000, () =>
    console.log('Server running: http://localhost:4000')
  );
};

start();
