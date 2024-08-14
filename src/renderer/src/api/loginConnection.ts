import axios from 'axios';
const urlAPI: string = 'http://localhost:8081/lab'

// const jwtToken: string|null = localStorage.getItem('authToken');

const apiTest = axios.create({
  baseURL: urlAPI,
})

export default apiTest
