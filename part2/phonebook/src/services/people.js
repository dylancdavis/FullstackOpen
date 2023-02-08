import axios from "axios";
const url = 'http://localhost:3001/api/persons';

export const getAll = () => {
    return axios
        .get(url)
        .then(r => r.data)
}

export const create = newPerson => {
    return axios
        .post(url, newPerson)
        .then(r => r.data)
}

export const update = (id,updatedPerson) => {
    return axios
        .put(`${url}/${id}`, updatedPerson)
}

export const remove = id => {
    return axios
        .delete(`${url}/${id}`)
}