import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Blog = ({ blog, handleBlogDelete }) => {
  const onDelete = () => {
    handleBlogDelete(blog);
  };

  const username = JSON.parse(localStorage.getItem("loggedInUser")).username;

  return (
    <li key={blog.id} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}{" "}
      {username === blog.user.username && (
        <Button className="delete-button" onClick={onDelete}>
          Delete Blog
        </Button>
      )}
    </li>
  );
};

export default Blog;
