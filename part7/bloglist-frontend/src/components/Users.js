import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const Users = ({ users }) => {
  return (
    <div className="users">
      <h2>USERS</h2>
      <Table>
        <th>Users</th>
        <th>Number of Blogs</th>
        <tbody>
          {users.map((u) => {
            console.log(u);

            return (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>
                  {u.blogs.length} {u.blogs.length === 1 ? "blog" : "blogs"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
