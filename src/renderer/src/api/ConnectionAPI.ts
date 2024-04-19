import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'

const jwtToken: string =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJEYXZpZCBHdXN0YXZvIExhcmEgVmVsYXpxdWV6IiwiaWRVc2VyIjoxLCJ1c2VyTmFtZSI6IkRhdmlkIEd1c3Rhdm8gTGFyYSBWZWxhenF1ZXoiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTM1NDQ0NTgsImV4cCI6MTcxMzU4MDQ1OH0.CTdoAzfTys0Dvd3Yojegg0ofQZEJzCflQG1Uvi6InQ0'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
