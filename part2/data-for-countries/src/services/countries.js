import axios from "axios";

export const getAll = () => {
    return axios.get('https://restcountries.com/v3.1/all')
}