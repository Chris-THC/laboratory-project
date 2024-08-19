import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImlkVXNlciI6MSwidXNlck5hbWUiOiJBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyNDA5ODMxOCwiZXhwIjoxNzI0MTM0MzE4fQ.dFYayQ7TVD5zFa9LjncMGhvKv02tbuep45Jv4MhAwKo'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
