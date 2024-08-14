import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = localStorage.getItem('authToken')!;

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
