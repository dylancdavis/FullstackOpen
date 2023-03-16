const User = ({ user }) => {
  if (user) console.log("displayed user:", user);
  if (!user) return null;
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {user.blogs.map((b) => (
          <li key="id">
            {b.title} ({b.author})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
