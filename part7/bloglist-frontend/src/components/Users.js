import { Link } from "react-router-dom";

const Users = ({ users }) => {
  return (
    <div className="users">
      <h2>USERS</h2>
      <ul>
        {users.map((u) => {
          console.log(u);

          return (
            <li key={u.id}>
              <Link to={`/users/${u.id}`}>{u.name}</Link>: {u.blogs.length}{" "}
              {u.blogs.length === 1 ? "blog" : "blogs"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
