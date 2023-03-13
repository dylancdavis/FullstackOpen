import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async text => {
	const newObj = { content: text, votes: 0 }
	const response = await axios.post(baseUrl, newObj)
	return response.data
}

const vote = async id => {
	const objById = await axios.get(`${baseUrl}/${id}`)
	const currentObj = objById.data
	const newObj = { ...currentObj, votes: currentObj.votes+1 }
	const response = await axios.put(`${baseUrl}/${id}`, newObj)
	return response.data
}

const anecdoteService = { getAll, create, vote }
export default anecdoteService