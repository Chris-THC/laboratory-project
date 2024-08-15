import axios from 'axios'
import { useToken } from '@renderer/context/JWTContext/JWTContext';
const urlAPI: string = 'http://localhost:8081/lab'
const token = useToken();
//const jwtToken: string|null = localStorage.getItem('authToken');
//const jwtToken: string = setToken(token)!;

const api = axios.create({
  baseURL: urlAPI,
  headers: {    
    ...(token && { Authorization: `Bearer ${token}` })||{},
    'Content-Type': 'application/json'
  }
})

export default api
