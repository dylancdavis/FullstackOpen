import { useState } from "react";
import { useDispatch } from "react-redux";
import { commentOn } from "../reducers/blogsReducer";
import blogService from "../services/blogs";
import { Button } from "react-bootstrap";

const BlogPage = ({ blog, handleLike }) => {
  const dispatch = useDispatch();

  const onLike = () => {
    handleLike(blog);
  };

  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    blogService.comment(blog.id, comment);
    dispatch(commentOn({ id: blog.id, comment }));
    setComment("");
  };

  if (!blog) return null;
  return (
    <div>
      <h1>
        {blog.title} - {blog.author}
      </h1>
      <h3>{blog.url}</h3>
      <p>
        Likes: {blog.likes} <Button onClick={onLike}>Like</Button>
      </p>
      <p>Added by {blog.user.name} </p>
      <h3>Comments:</h3>
      <form>
        <label htmlFor="blog-comment">Comment: </label>
        <input
          id="blog-comment"
          placeholder="add a comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <Button onClick={handleSubmit}>add</Button>
      </form>
      {blog.comments.length ? (
        <>
          <ul>
            {blog.comments.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </>
      ) : (
        <i>no comments yet...</i>
      )}
    </div>
  );
};

export default BlogPage;
