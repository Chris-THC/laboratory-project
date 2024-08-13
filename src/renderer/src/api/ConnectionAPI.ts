import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string|null = localStorage.getItem('authToken');
const strValue: string = jwtToken!;

const api = axios.create({
  baseURL: urlAPI,
  headers: {    
    ...(strValue && { Authorization: `Bearer ${strValue}` }),
    'Content-Type': 'application/json'
  }
})

export default api
