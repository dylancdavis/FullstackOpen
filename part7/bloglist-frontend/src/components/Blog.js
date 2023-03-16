import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Blog = ({ blog, handleBlogLike, handleBlogDelete }) => {
  const onLike = () => {
    handleBlogLike(blog);
  };
  const onDelete = () => {
    handleBlogDelete(blog);
  };

  const username = JSON.parse(localStorage.getItem("loggedInUser")).username;

  return (
    <li key={blog.id} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
      <Togglable showText={"show"} hideText={"hide"}>
        <ul className="hidden-list">
          <li key="likes">
            {`-Likes: ${blog.likes}`}{" "}
            <Button className="like-button" onClick={onLike}>
              Like
            </Button>
          </li>
          <li key="url">{`URL: ${blog.url}`}</li>
          <li key="from">{`From: ${blog.user.name}`}</li>
          {username === blog.user.username && (
            <li>
              <Button className="delete-button" onClick={onDelete}>
                Delete Blog
              </Button>
            </li>
          )}
        </ul>
      </Togglable>
    </li>
  );
};

export default Blog;
