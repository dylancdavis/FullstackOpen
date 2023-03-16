const BlogPage = ({ blog, handleLike }) => {
  const onLike = () => {
    handleLike(blog);
  };

  if (!blog) return null;
  return (
    <div>
      <h1>
        {blog.title} - {blog.author}
      </h1>
      <h3>{blog.url}</h3>
      <p>
        Likes: {blog.likes} <button onClick={onLike}>Like</button>
      </p>
      <p>Added by {blog.user.name} </p>
    </div>
  );
};

export default BlogPage;
