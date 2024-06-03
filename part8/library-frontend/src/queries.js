import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

`type Query {
  me: User
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
}`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ALL_BOOKS = gql`
  query booksWithGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`;

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      id
    }
  }
`;

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
    }
  }
`;
