import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MjA5MjMwNTMsImV4cCI6MTcyMDk1OTA1M30.HkpmfnjLyJLhM9liQl2m3-nBvTKug7i-nKdrzs-7aQs'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
