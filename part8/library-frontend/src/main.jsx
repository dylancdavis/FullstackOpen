import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { InMemoryCache, ApolloClient, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allAuthors {
      name
    }
  }
`;

client.query({ query }).then((res) => {
  console.log(res.data);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
