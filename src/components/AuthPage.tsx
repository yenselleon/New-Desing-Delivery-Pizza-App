import { useState } from "react";
import { Pizza, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Red Background with Pizza */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-400 to-red-500 relative overflow-hidden items-center justify-center">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-80" />
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-400 rounded-br-full opacity-60" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-400 rounded-tr-full opacity-60" />
        
        {/* Logo */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <div className="w-48 h-48 bg-orange-400 rounded-3xl flex items-center justify-center shadow-2xl">
            <Pizza className="w-32 h-32 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="text-white text-center px-8">
            AVILA
          </h2>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Decorative shapes for mobile/right side */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-40 hidden lg:block" />
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-30 hidden lg:block" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Volver
          </Link>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center">
              <Pizza className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="mb-2 text-red-500">Login to your account</h2>
              
              <form onSubmit={handleLogin} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    className="border-gray-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className="border-gray-200 focus:border-red-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                    className="text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    forgot your password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Login
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-red-500 hover:underline"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Register Form */
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="mb-2 text-red-500">Create your account</h2>
              
              <form onSubmit={handleRegister} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={registerData.fullName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, fullName: e.target.value })
                    }
                    className="border-gray-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                    className="border-gray-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    className="border-gray-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Address"
                    value={registerData.address}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, address: e.target.value })
                    }
                    className="border-gray-200 focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      className="border-gray-200 focus:border-red-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                  <div className="relative">
                    <Input
                      id="repeat-password"
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="Repeat Password"
                      value={registerData.repeatPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          repeatPassword: e.target.value,
                        })
                      }
                      className="border-gray-200 focus:border-red-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Register
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-red-500 hover:underline"
                  >
                    Login
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
