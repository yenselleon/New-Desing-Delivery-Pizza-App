import { useState } from "react";
import { Pizza, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    repeatPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    // Simulación de login exitoso
    toast.success("¡Inicio de sesión exitoso!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      !registerData.fullName ||
      !registerData.phone ||
      !registerData.email ||
      !registerData.address ||
      !registerData.password ||
      !registerData.repeatPassword
    ) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (registerData.password !== registerData.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Simulación de registro exitoso
    toast.success("¡Cuenta creada exitosamente!");
    setTimeout(() => {
      setIsLogin(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex">
      {/* Left Side - Orange/Red Background with Pizza Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-red-500 relative overflow-hidden items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1634043319926-c2565ac15c63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpY2lvdXMlMjBwaXp6YXxlbnwxfHx8fDE3NjgzMzg1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Pizza Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-300 rounded-full opacity-30 blur-xl" />
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-red-400 rounded-full opacity-30 blur-xl" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-200 rounded-full opacity-40 blur-lg" />
        
        {/* Logo and Branding */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-8">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/30">
            <Pizza className="w-20 h-20 text-white" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <h1 className="text-white mb-2">PizzaTime</h1>
            <p className="text-orange-100 text-lg max-w-md">
              Las mejores pizzas artesanales con entrega rápida a tu puerta
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-30 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-100 to-red-100 rounded-full opacity-40 blur-3xl -z-10" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-500 mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Volver
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Pizza className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-orange-100">
              <div className="text-center mb-6">
                <h2 className="text-orange-600 mb-2">Bienvenido de nuevo</h2>
                <p className="text-muted-foreground">Ingresa a tu cuenta para continuar</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-5 mt-8">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 pr-10 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30"
                >
                  Iniciar Sesión
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-orange-500 hover:text-orange-600 hover:underline transition-colors"
                  >
                    Crear cuenta
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Register Form */
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-orange-100">
              <div className="text-center mb-6">
                <h2 className="text-orange-600 mb-2">Crear cuenta</h2>
                <p className="text-muted-foreground">Únete y disfruta de las mejores pizzas</p>
              </div>
              
              <form onSubmit={handleRegister} className="space-y-4 mt-8">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Nombre completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Juan Pérez"
                    value={registerData.fullName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, fullName: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-foreground">Correo electrónico</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground">Dirección</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Calle, Número, Ciudad"
                    value={registerData.address}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, address: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 pr-10 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repeat-password" className="text-foreground">Repetir contraseña</Label>
                  <div className="relative">
                    <Input
                      id="repeat-password"
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerData.repeatPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          repeatPassword: e.target.value,
                        })
                      }
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500/20 pr-10 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      {showRepeatPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/30 mt-6"
                >
                  Crear Cuenta
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-orange-500 hover:text-orange-600 hover:underline transition-colors"
                  >
                    Iniciar sesión
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}