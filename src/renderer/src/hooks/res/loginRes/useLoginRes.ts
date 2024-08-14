import { LoginAuthInterface} from '@renderer/interfaces/auth/loginAuth'
import apiConectionTest from '../../../api/loginConnection'

export const postLogin = async (contentBody: LoginAuthInterface): Promise<LoginAuthInterface  | null> => {
    try {
      const { data } = await apiConectionTest.post<LoginAuthInterface >('/auth/login', contentBody)
      if (data && data.token) {
        localStorage.setItem('authToken', data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
      return null;  
    }
  }
  