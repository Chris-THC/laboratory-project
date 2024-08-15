import { LoginAuthInterface} from '@renderer/interfaces/auth/loginAuth'
import apiConection from '../../../api/ConnectionAPI'
import { useToken } from '@renderer/context/JWTContext/JWTContext';

export const postLogin = async (contentBody: LoginAuthInterface): Promise<LoginAuthInterface  | null> => {
    const {setToken} = useToken();
    try {
      const { data } = await apiConection.post<LoginAuthInterface >('/auth/login', contentBody)
      if (data && data.token) {
        //localStorage.setItem('authToken', data.token);
        setToken(data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
      return null;  
    }
  }
  