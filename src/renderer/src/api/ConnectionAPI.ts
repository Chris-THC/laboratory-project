import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTQ0ODc4NzAsImV4cCI6MTcxNDUyMzg3MH0.Jyg1dFBOsTlrniAI88tHXTUN9rEPhrAFUNm6_fBN2Nw'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
