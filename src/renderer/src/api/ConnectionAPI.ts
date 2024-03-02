import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'
//TODO: se usara cuando spring security este listo
// const jwtToken: string =
//   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc3JhQGdtYWlsLmNvbSIsImlhdCI6MTcwODgzMTM4NCwiZXhwIjoxNzA4ODQ5Mzg0fQ.SwG4wdapd6-GmwxKS7bnycnrWWDeFIcvVP5UgFOt0gs'

const api = axios.create({
  baseURL: urlAPI,
  headers: {
    //TODO: se usara cuando spring security este listo
    //   Authorization: `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})

export default api
