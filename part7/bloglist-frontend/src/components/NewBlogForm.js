import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NewBlogForm = ({ handleOnSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const clearAndSubmit = (e) => {
    e.preventDefault();

    setTitle("");
    setAuthor("");
    setUrl("");

    handleOnSubmit(title, author, url);
  };

  return (
    <>
      <h2 className="mt-3">Create New Blog</h2>
      <Form onSubmit={clearAndSubmit}>
        <Form.Group className="mt-3">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            className="title-input"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Author:</Form.Label>
          <Form.Control
            className="author-input"
            value={author}
            onChange={handleAuthorChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>URL:</Form.Label>
          <Form.Control
            className="url-input"
            value={url}
            onChange={handleUrlChange}
          />
        </Form.Group>
        <Button className="submit-button mt-3" type="submit">
          Create Blog
        </Button>
      </Form>
    </>
  );
};

export default NewBlogForm;
