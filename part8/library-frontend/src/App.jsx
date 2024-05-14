import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';

const App = () => {
  const [page, setPage] = useState('authors');

  const [token, setToken] = useState(null);

  const onLogin = (token) => {
    setToken(token);
    setPage('authors');
    window.localStorage.setItem('library-token', token);
  };

  const onLogout = () => {
    setToken(null);
    setPage('authors')
    window.localStorage.removeItem('library-token');
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button hidden={!token} onClick={() => setPage('add')}>
          add book
        </button>
        <button hidden={token} onClick={() => setPage('login')}>
          login
        </button>
        {token ? (
          <button onClick={onLogout}>Logout</button>
        ) : (
          <LoginForm show={page === 'login'} onLogin={onLogin} />
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
