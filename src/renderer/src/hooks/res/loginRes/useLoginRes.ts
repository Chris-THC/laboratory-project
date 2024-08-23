import { LoginAuthInterface } from '@renderer/interfaces/auth/loginAuth';
import apiConectionTest from '../../../api/ConnectionAPI';
import toast from 'react-hot-toast'

export const postLogin = async (contentBody: LoginAuthInterface): Promise<LoginAuthInterface  | null> => {

    try {
      const { data } = await apiConectionTest.post<LoginAuthInterface >('/auth/login', contentBody)
      return data;
    } catch (error) {
      console.log(error);
      toast.error('Usuario Invalido')
      return null;  
    }
  }
  