import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

export default function LoginForm({ show, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);

  if (!show) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({ variables: { username, password } });
    const token = response.data.login.value
    onLogin(token);
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
