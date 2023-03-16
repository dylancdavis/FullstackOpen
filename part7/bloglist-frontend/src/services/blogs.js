import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (t) => {
  token = `Bearer ${t}`;
};

const getAll = async () => (await axios.get(baseUrl)).data;

const create = async (blog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

const comment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    text: comment,
  });
  return response.data;
};

const blogService = { setToken, getAll, create, update, remove, comment };
export default blogService;
