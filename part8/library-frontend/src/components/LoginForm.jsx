export default function LoginForm({ show }) {
  if (!show) return null;

  return (
    <div>
      <div>
        <label htmlFor="username">username: </label>
        <input id="username"></input>
      </div>
      <div>
        <label htmlFor="password">password: </label>
        <input id="password"></input>
      </div>
      <button type="submit">login</button>
    </div>
  );
}
