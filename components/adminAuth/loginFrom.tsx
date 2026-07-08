"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Inputs } from "@/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {  Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const LoginForm = ({
 loginUser,
navigation,
singUpLink,
heading
}:any) => {

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    const email = data?.email;
    const password = data?.password;
    setIsLoading(true);
    try {
      const response = await loginUser({
        email,
        password,
      }).unwrap();
      toast.success("Welcome back!", { 
      position: "top-center"});
      router.push(navigation);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Login failed", {position: "top-center" })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 font-quicksand relative overflow-hidden">
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
   

        {/* Form Card */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-8 rounded-2xl border border-gray-800/50 shadow-2xl shadow-purple-500/5 backdrop-blur-sm">
             {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-teal-400 bg-clip-text text-transparent">
            Welcome {heading}
          </h2>
          <p className="mt-2 text-gray-400 text-sm">Sign in to manage your workforce</p>
        </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 rounded-xl transition-all duration-300 group-focus-within:from-purple-500/10 group-focus-within:to-purple-500/5"></div>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#0a0a0a] border ${
                      errors.email ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all relative z-10`}
                    placeholder="you@company.com"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1.5 block flex items-center gap-1">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-400" />
                    Password
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 rounded-xl transition-all duration-300 group-focus-within:from-purple-500/10 group-focus-within:to-purple-500/5"></div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    className={`w-full pl-11 pr-12 py-3.5 bg-[#0a0a0a] border ${
                      errors.password ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all relative z-10`}
                    placeholder="Enter your password"
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

       

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  href={singUpLink}
                  className="font-medium text-purple-400 hover:text-purple-300 transition-colors hover:underline inline-flex items-center gap-1"
                >
                  Create one
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

export default LoginForm;