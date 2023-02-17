import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => (await axios.get(baseUrl)).data

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }