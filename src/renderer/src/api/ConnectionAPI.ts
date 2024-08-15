// import axios from 'axios'
// import { useToken } from '@renderer/context/JWTContext/JWTContext';
// const urlAPI: string = 'http://localhost:8081/lab'
// const token = useToken();

// const api = axios.create({
//   baseURL: urlAPI,
//   headers: {    
//     ...(token && { Authorization: `Bearer ${token}` })||{},
//     'Content-Type': 'application/json'
//   }
// })

// export default api

import axios, { AxiosInstance } from 'axios';
import { useToken } from '@renderer/context/JWTContext/JWTContext';

const urlAPI: string = 'http://localhost:8081/lab';

export const createApi = (token?: string): AxiosInstance => {
  // const token = customToken || useToken();

  return axios.create({
    baseURL: urlAPI,
    headers: {    
      ...(token && { Authorization: `Bearer ${token}` }) || {},
      'Content-Type': 'application/json'
    }
  });
};

export default createApi;
