import { useState } from 'react';

export default function LoginForm({ show, setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, password });
    const token = 'dummy';
    setToken(token);
    window.localStorage.setItem('library-token', token);
  };

  return (
    <div>
      <div>
        <label htmlFor="username">username: </label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </div>
      <button type="submit" onClick={handleSubmit}>
        login
      </button>
    </div>
  );
}
