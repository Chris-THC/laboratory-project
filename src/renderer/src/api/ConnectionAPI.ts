import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImlkVXNlciI6MSwidXNlck5hbWUiOiJBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyNDExNTAzNiwiZXhwIjoxNzI0MTUxMDM2fQ.Fm7sJ_WdtkGzDc6dyZ3OOADneph5Q6QAW8tObw2x4P4'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
