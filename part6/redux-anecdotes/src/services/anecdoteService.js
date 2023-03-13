import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (text) => {
	const newObj = { content: text, votes: 0 }
	const response = await axios.post(baseUrl, newObj)
	return response.data
}

const noteService = { getAll, create }
export default noteService