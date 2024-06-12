const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { User, Book, Author } = require('./schema.js');
const { typeDefs } = require('./typeDefs.js');
const { resolvers } = require('./resolvers.js');

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'library' })
  .then(() => {
    console.log('Sucessfully connected to MongoDB.');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const encodedToken = auth.substring(7);
      const decodedToken = jwt.verify(encodedToken, process.env.JWT_SECRET);
      const foundUser = await User.findById(decodedToken.id);
      return { currentUser: foundUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
