import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImlkVXNlciI6MSwidXNlck5hbWUiOiJBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcyNDE3NTQzMCwiZXhwIjoxNzI0MjExNDMwfQ.IeIoBUnVXBOp-pp6roJ3OtNmBjW_KHaw2XfN8gtQm-w'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
