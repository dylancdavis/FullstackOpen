import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = t => { token = `Bearer ${t}` }

const getAll = async () => (await axios.get(baseUrl)).data

const create = async (blog) => {
  const config = {headers: {Authorization: token}}
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`,newBlog)
  console.log(response);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, create, update }