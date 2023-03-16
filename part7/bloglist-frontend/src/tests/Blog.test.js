import Blog from "../components/Blog";
import React from "react";
import { render, screen } from "@testing-library/react";
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

let mockDelete;

describe("Blog component", () => {
  beforeEach(() => {
    mockDelete = jest.fn();
  });

  test("renders title and author", () => {
    const mockLike = jest.fn();
    const { container } = render(
      <Blog
        blog={sampleBlog}
        handleBlogLike={mockLike}
        handleBlogDelete={mockDelete}
      />
    );
    const blogElement = container.querySelector(".blog");
    expect(blogElement).toHaveTextContent(sampleBlog.title);
    expect(blogElement).toHaveTextContent(sampleBlog.author);
  });

  test("does not nitially render likes or URL", () => {
    const mockLike = jest.fn();
    render(
      <Blog
        blog={sampleBlog}
        handleBlogLike={mockLike}
        handleBlogDelete={mockDelete}
      />
    );
    expect(screen.queryByText(`-Likes: ${sampleBlog.likes}`)).toBeNull();
    expect(screen.queryByText(`URL: ${sampleBlog.url}`)).toBeNull();
  });

  test("renders likes and URL on show button click", async () => {
    const mockLike = jest.fn();
    const { container } = render(
      <Blog
        blog={sampleBlog}
        handleBlogLike={mockLike}
        handleBlogDelete={mockDelete}
      />
    );

    // Click the 'show' button
    const user = userEvent.setup();
    const showBtn = container.querySelector(".show-button");
    await user.click(showBtn);

    // See if the text exists after buttonclick
    screen.getByText(`-Likes: ${sampleBlog.likes}`);
    screen.getByText(`URL: ${sampleBlog.url}`);
  });

  test("calls like handler twice when like button clicked twice", async () => {
    const mockLike = jest.fn();
    const { container } = render(
      <Blog
        blog={sampleBlog}
        handleBlogLike={mockLike}
        handleBlogDelete={mockDelete}
      />
    );
    const user = userEvent.setup();

    // Show content for like button
    const showBtn = container.querySelector(".show-button");
    await user.click(showBtn);

    // Click like button twice
    const likeBtn = container.querySelector(".like-button");
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockLike.mock.calls).toHaveLength(2);
  });
});
