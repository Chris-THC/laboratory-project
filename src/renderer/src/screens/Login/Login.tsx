import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToken } from '@renderer/context/JWTContext/JWTContext'
import { postLogin } from '@renderer/hooks/res/loginRes/useLoginRes'
import { LoginAuthInterface } from '@renderer/interfaces/auth/loginAuth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export const Login: React.FC = () => {
  const navigateTo = useNavigate()
  const { setToken } = useToken()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginAuthInterface>({ mode: 'all' })

  const ManagerEventSubmmit = async (data: LoginAuthInterface): Promise<void> => {
    try {
      const response = await postLogin(data)
      if (response) {
        // Handle successful login, e.g., store token, redirect
        navigateTo('/customer/form') // Replace with your desired redirect
        setToken(response.token)
      } else {
        // Handle login error, e.g., display error message
        console.error('Login failed')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Inicia sesión</h1>
        <p className="text-muted-foreground">Ingresa tu nombre y contraseña para accesar</p>
      </div>
      <form className="space-y-4" id="contactForm" onSubmit={handleSubmit(ManagerEventSubmmit)}>
        <div className="space-y-2">
          <Label htmlFor="nombre">
            Nombre <span className="text-danger">*</span>
          </Label>
          <Input
            id="nombre"
            type="text"
            placeholder="nombre"
            {...register('name', { required: true })}
          />
          {errors.name?.type === 'required' && (
            <span className="text-danger">El nombre es requerido</span>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="contraseña"
            {...register('password', { required: true })}
          />
          {errors.password?.type === 'required' && (
            <span className="text-danger">La contraseña es requerida</span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={!isValid}>
          Iniciar Sesión
        </Button>
      </form>
      <Toaster />
    </div>
  )
}
