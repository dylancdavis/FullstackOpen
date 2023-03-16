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
      {blog.comments.length ? (
        <>
          <h3>Comments:</h3>
          <ul>
            {blog.comments.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default BlogPage;
