import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjE5NDAyOTYsImV4cCI6MTcyMTk3NjI5Nn0.Y90l95r5PA2YSDSIt49FKkJ5va7iGI_zWes26xs9D1M"

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
