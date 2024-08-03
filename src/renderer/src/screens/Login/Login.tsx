import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { setUserRoll, setUser, setIsLoggedIn, LoginFuntion, setToken } =
    useContext(GetTheAppContext);
  const navigeteTo = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm({ mode: "all" });

      const TokenSeparator = (token) => {
        const parts = token.split(".");
        const payload = JSON.parse(atob(parts[1]));
        return payload;
      };

      const ManagerEventSubmmit = async (data) => {
        try {
          const isLogin = await LoginFuntion(data);
    
          if (isLogin.status === 200) {
            let loggedUserInfo = TokenSeparator(isLogin.data.token);
            setUser(loggedUserInfo);
            console.log(loggedUserInfo);
            setToken(isLogin.data.token);
            setIsLoggedIn(true);
            setUserRoll(loggedUserInfo.role);
            if (loggedUserInfo.role === "Doctor") {
              navigeteTo("/doctor");
            } else if (loggedUserInfo.role === "Patient") {
              navigeteTo("/patient/medical/information");
            }
            alert("Sesión iniciada correctamente");
          } else {
            alert("NO se pudo iniciar sesion");
          }
        } catch (error) {
          console.log("Error");
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
            {...register("email", {
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