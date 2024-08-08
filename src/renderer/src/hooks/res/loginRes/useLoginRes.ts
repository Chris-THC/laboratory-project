import { LoginAuthInterface } from '@renderer/interfaces/auth/loginAuth'
import apiConection from '../../../api/ConnectionAPI'


export const postLogin = async (contentBody: LoginAuthInterface): Promise<LoginAuthInterface> => {
    const { data } = await apiConection.post<LoginAuthInterface>('/auth/login', contentBody)
    return data
  }
  