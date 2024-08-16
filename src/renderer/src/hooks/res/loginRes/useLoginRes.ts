import { LoginAuthInterface } from '@renderer/interfaces/auth/loginAuth';
import apiConectionTest from '../../../api/ConnectionAPI';

export const postLogin = async (contentBody: LoginAuthInterface): Promise<LoginAuthInterface  | null> => {

    try {
      const { data } = await apiConectionTest.post<LoginAuthInterface >('/auth/login', contentBody)
      return data;
    } catch (error) {
      console.log(error);
      return null;  
    }
  }
  