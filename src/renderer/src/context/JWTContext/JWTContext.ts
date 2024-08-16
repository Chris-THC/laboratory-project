import {create} from 'zustand'

interface JWTContext{
    token: string
    setToken: (token: string)=> void
}

export const useToken = create <JWTContext>((set) =>({
    token: '',
    setToken: (token: string): void => 
        set (()=>({
            token:token
        }))
}))

export const getToken = () => useToken.getState().token;