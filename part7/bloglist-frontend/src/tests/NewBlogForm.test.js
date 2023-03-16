import NewBlogForm from "../components/NewBlogForm";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const sampleBlog = {
  title: "A Sample Blog",
  author: "Example Author",
  likes: 0,
  url: "www.example.com",
  user: {
    name: "Example Name",
  },
};

describe("NewBlogForm component", () => {
  test("calls event handler on blog creation", async () => {
    const mockSubmit = jest.fn();
    const { container } = render(<NewBlogForm handleOnSubmit={mockSubmit} />);

    // Get form elements
    const user = userEvent.setup();
    const submitBtn = container.querySelector(".submit-button");
    const titleInput = container.querySelector(".title-input");
    const authorInput = container.querySelector(".author-input");
    const urlInput = container.querySelector(".url-input");

    // Type into inputs and submit
    await user.type(titleInput, sampleBlog.title);
    await user.type(authorInput, sampleBlog.author);
    await user.type(urlInput, sampleBlog.url);
    await user.click(submitBtn);

    // Ensure 1 call with correct data
    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockSubmit.mock.calls[0]).toEqual([
      sampleBlog.title,
      sampleBlog.author,
      sampleBlog.url,
    ]);
  });
});
