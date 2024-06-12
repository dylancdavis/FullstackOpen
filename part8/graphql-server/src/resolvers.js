const { User, Book, Author } = require('./schema.js');
const { GraphQLError } = require('graphql');

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
      return Book.find(filter).populate('author');
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
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to add books', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
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
      fields.author = foundAuthor._id;
      const newBook = new Book(fields);
      try {
        return newBook.save().then((b) => b.populate('author'));
      } catch (error) {
        throw new GraphQLError('Unable to add book', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args, error },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('You must be logged in to edit authors', {
          extensions: { code: 'UNAUTHORIZED' },
        });
      }
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
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },
};

module.exports = { resolvers };
