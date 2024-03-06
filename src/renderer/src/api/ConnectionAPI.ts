import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKdWFuIExvcGV6IEhlcm5hbmRleiIsImlkVXNlciI6MiwidXNlck5hbWUiOiJKdWFuIExvcGV6IEhlcm5hbmRleiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTcwOTc0OTg1NiwiZXhwIjoxNzA5NzUxMjk2fQ.SOK_F3bUtlBPLvkt-fTwoJdLEBo-1Dp3RHDXhL1lG7g'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
