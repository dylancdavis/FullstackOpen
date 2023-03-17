import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";
import BlogItem from "./BlogItem";

const Blogs = ({ blogFormRef, blogs, handleBlogCreate, handleBlogDelete }) => {
  return (
    <div>
      <h2>BLOGS</h2>
      <Togglable showText={"Add Blog"} hideText={"Cancel"} ref={blogFormRef}>
        <NewBlogForm handleOnSubmit={handleBlogCreate} />
      </Togglable>
      <ul>
        {blogs
          .slice()
          .sort((b1, b2) => b2.likes - b1.likes)
          .map((b) => (
            <BlogItem key={b.id} blog={b} handleBlogDelete={handleBlogDelete} />
          ))}
      </ul>
    </div>
  );
};

export default Blogs;
