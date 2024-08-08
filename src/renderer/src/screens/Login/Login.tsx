import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigateTo = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({ mode: "all" });


   const ManagerEventSubmmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/lab/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login, e.g., store token, redirect
        navigateTo('/customer/form'); // Replace with your desired redirect
      } else {
        // Handle login error, e.g., display error message
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

   

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Inicia sesión</h1>
        <p className="text-muted-foreground">Ingresa tu nombre y contraseña para accesar</p>
      </div>
      <form className="space-y-4"  id="contactForm"
                onSubmit={handleSubmit(ManagerEventSubmmit)}>

        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre <span className="text-danger">*</span></Label>
          <Input 
            id="nombre" 
            type="text" 
            placeholder="nombre" 
            {...register("nombre", {
                required: true
            })}
        />
        {errors.email?.type === "required" && (
                      <span className="text-danger">
                        El correo nombre es requerido
                      </span>
                    )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="contraseña"
            {...register("password", {
                required: true,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-danger">
                La contraseña es requerida
              </span>
            )}
        </div>

        <Button type="submit" className="w-full" disabled={!isValid}>
          Iniciar Sesión
        </Button>

      </form>
    </div>
  )
}