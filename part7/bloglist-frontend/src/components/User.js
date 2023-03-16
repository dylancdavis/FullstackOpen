const User = ({ user }) => {
  if (!user) return null;
  return <div>{user.name}</div>;
};

export default User;
