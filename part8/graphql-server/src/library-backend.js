const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'library' })
  .then(() => {
    console.log('Sucessfully connected to MongoDB.');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
});

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
});

userSchema.plugin(uniqueValidator);
bookSchema.plugin(uniqueValidator);
authorSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }


  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.genre) {
        // Note conversion to plural
        filter.genres = args.genre;
      }
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
        if (!foundAuthor) {
          throw new GraphQLError(`Author ${args.author} not found`);
        }
        filter.author = foundAuthor._id;
      }
      return Book.find(filter);
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    createUser: async (root, args) => {
      if (args.username.length < 3) {
        throw new GraphQLError(
          'Unable to create user: username must be at least 3 characters long',
          { extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.username } }
        );
      }
      const newUser = new User({ ...args });
      try {
        return newUser.save();
      } catch (error) {
        throw new GraphQLError('Unable to create user', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args, error },
        });
      }
    },
    login: async (root, args) => {
      const foundUser = await User.findOne({ username: args.username });
      if (!foundUser || args.password !== 'hunter2') {
        throw new GraphQLError('Incorrect username or password', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
      const userForToken = {
        username: foundUser.username,
        id: foundUser._id,
      };
      const token = jwt.sign(userForToken, process.env.JWT_SECRET);
      return { value: token };
    },
    addBook: async (root, args) => {
      if (args.title.length < 5) {
        throw new GraphQLError(
          'Unable to add book: title must be at least 5 characters long',
          { extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.title } }
        );
      }
      let foundAuthor = await Author.findOne({ name: args.author });
      if (!foundAuthor) {
        if (args.author.length < 4) {
          throw new GraphQLError(
            'Unable to add author: name must be at least 4 characters long',
            { extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author } }
          );
        }
        let newAuthor = new Author({ name: args.author });
        try {
          foundAuthor = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Unable to add author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const fields = { ...args };
      fields.author = foundAuthor.id;
      const newBook = new Book(fields);
      try {
        return newBook.save();
      } catch (error) {
        throw new GraphQLError('Unable to add book', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args, error },
        });
      }
    },
    editAuthor: async (root, args) => {
      const foundAuthor = await Author.findOne({ name: args.name });
      if (!foundAuthor) {
        throw new GraphQLError(`Author ${args.name} not found`);
      }
      foundAuthor.born = args.setBornTo;
      try {
        return foundAuthor.save();
      } catch (error) {
        throw new GraphQLError('Unable to update author', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args, error },
        });
      }
    },
  },
  Author: {
    bookCount: (root) => books.filter((b) => b.author === root.name).length,
  },
};

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
