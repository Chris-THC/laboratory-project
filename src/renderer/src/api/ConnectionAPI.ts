import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjMxNzk1NjcsImV4cCI6MTcyMzIxNTU2N30.-QgrTM1q8dB-F9tPvU5KRJvvdR5RmrqzzdQhbIBsAqg"

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
