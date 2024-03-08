import axios from 'axios'
const urlAPI: string = 'http://localhost:8081/lab'
<<<<<<< HEAD
//TODO: se usara cuando spring security este listo
// const jwtToken: string =
//   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpc3JhQGdtYWlsLmNvbSIsImlhdCI6MTcwODgzMTM4NCwiZXhwIjoxNzA4ODQ5Mzg0fQ.SwG4wdapd6-GmwxKS7bnycnrWWDeFIcvVP5UgFOt0gs'
=======

const jwtToken: string = 'add_token'
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f

const api = axios.create({
  baseURL: urlAPI,
  headers: {
<<<<<<< HEAD
    //TODO: se usara cuando spring security este listo
    //   Authorization: `Bearer ${jwtToken}`,
=======
    Authorization: `Bearer ${jwtToken}`,
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
    'Content-Type': 'application/json'
  }
})

export default api
