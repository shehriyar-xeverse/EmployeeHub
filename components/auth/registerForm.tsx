"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RegisterInputs } from "@/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/store/userApi";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Check, Shield, Users } from "lucide-react";
import { useState } from "react";

const RegisterForm = () => {
  const [registerUser] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const router = useRouter();
  const onSubmit = async (data: RegisterInputs) => {
    const { name, email, password } = data;

    setIsLoading(true);
    try {
      const response = await registerUser({
        name,
        email,
        password,
      }).unwrap();
      toast.success("Account created successfully!", {
        position: "top-center",
      });
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Registration failed", {position: "top-center",});
    } finally {
      setIsLoading(false);
    }
  };

 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 font-quicksand relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-teal-400/30 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-40 right-10 w-3 h-3 bg-teal-400/30 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-8 rounded-2xl border border-gray-800/50 shadow-2xl shadow-purple-500/5 backdrop-blur-sm max-h-[90vh] ">
          <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-teal-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-gray-400 text-sm">Join us and start managing your team</p>
        </div>
         
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" />
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 rounded-xl transition-all duration-300 group-focus-within:from-purple-500/10 group-focus-within:to-purple-500/5"></div>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#0a0a0a] border ${
                      errors.name ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all relative z-10`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <span className="text-red-400 text-xs mt-1.5 block flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.name.message}
                  </span>
                )}
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 rounded-xl transition-all duration-300 group-focus-within:from-purple-500/10 group-focus-within:to-purple-500/5"></div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                        message: "Only Gmail addresses are allowed",
                      },
                    })}
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#0a0a0a] border ${
                      errors.email ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all relative z-10`}
                    placeholder="example@gmail.com"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1.5 block flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-400" />
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 rounded-xl transition-all duration-300 group-focus-within:from-purple-500/10 group-focus-within:to-purple-500/5"></div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full pl-11 pr-12 py-3.5 bg-[#0a0a0a] border ${
                      errors.password ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all relative z-10`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                
                {errors.password && (
                  <span className="text-red-400 text-xs mt-1.5 block flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors hover:underline inline-flex items-center gap-1"
                >
                  Sign in
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;