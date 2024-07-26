import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjIwMTQwMzQsImV4cCI6MTcyMjA1MDAzNH0.--rid9q6m8M0BbtL2K8arH7_mEoaa7NrgGDf-2iifos"

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
