import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjM1MTIyNjgsImV4cCI6MTcyMzU0ODI2OH0.YUGQ1YklF5kb-Ld-GpKVrPI9RuV8kMtqaxAoI_ib8UQ"

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
