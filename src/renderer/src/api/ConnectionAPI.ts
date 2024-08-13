import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const api = axios.create({
  baseURL: urlAPI,
  headers: {    
    Authorization: `Bearer ${localStorage.getItem('authToken')}`, 
    'Content-Type': 'application/json'
  }
})

export default api
