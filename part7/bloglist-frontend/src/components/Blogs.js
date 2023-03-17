import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";
import { Table } from "react-bootstrap";
import BlogItem from "./BlogItem";

const Blogs = ({ blogFormRef, blogs, handleBlogCreate, handleBlogDelete }) => {
  return (
    <div className="blogs">
      <h2>BLOGS</h2>
      <Table striped="columns">
        {blogs
          .slice()
          .sort((b1, b2) => b2.likes - b1.likes)
          .map((b) => (
            <BlogItem key={b.id} blog={b} handleBlogDelete={handleBlogDelete} />
          ))}
      </Table>
      <Togglable showText={"Add Blog"} hideText={"Cancel"} ref={blogFormRef}>
        <NewBlogForm handleOnSubmit={handleBlogCreate} />
      </Togglable>
    </div>
  );
};

export default Blogs;
