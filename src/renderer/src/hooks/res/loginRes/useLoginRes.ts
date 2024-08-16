import { LoginAuthInterface } from '@renderer/interfaces/auth/loginAuth';
import apiConectionTest from '../../../api/ConnectionAPI';

export const postLogin = async (contentBody: LoginAuthInterface): Promise<LoginAuthInterface  | null> => {

    // const {setToken} = useToken();
    // const apiConection = apiConectionTest('');
    try {
      const { data } = await apiConectionTest.post<LoginAuthInterface >('/auth/login', contentBody)
      if (data && data.token) {
        //localStorage.setItem('authToken', data.token);
        // setToken(data.token);
      }
      return data;
    } catch (error) {
      console.log(error);
      return null;  
    }
  }
  