import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTYyNTEzOTMsImV4cCI6MTcxNjI4NzM5M30.geKcFpobw9fswckY7n3OIXYdatJIDjNuFe0utKNPaFo'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
