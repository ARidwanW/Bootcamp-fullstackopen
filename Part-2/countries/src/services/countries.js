import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getByName = (fullname) => {
    const request = axios.get(`${baseUrl}/name/${fullname}`)
    return request.then(response => response.data)
}

export default {getAll, getByName}