"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Inputs } from "@/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {  Eye, EyeOff, ArrowRight } from "lucide-react";
import React, { useState } from "react";

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
      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-8 rounded-2xl border border-gray-800/50 shadow-2xl shadow-teal-500/5 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-teal-400">
            Welcome {heading} 
          </h2>
          <p className="mt-2 text-gray-400 text-sm">Sign in to manage your workforce</p>
        </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 flex items-center gap-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-teal-500/0 rounded-xl transition-all duration-300 group-focus-within:from-teal-500/10 group-focus-within:to-teal-500/5"></div>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className={`w-full pl-11 pr-4 py-3.5 bg-[#0a0a0a] border ${
                      errors.email ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all relative z-10`}
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
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-teal-500/0 rounded-xl transition-all duration-300 group-focus-within:from-teal-500/10 group-focus-within:to-teal-500/5"></div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    className={`w-full pl-11 pr-12 py-3.5 bg-[#0a0a0a] border ${
                      errors.password ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all relative z-10`}
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
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12  bg-teal-900 hover:bg-purpple-700 text-white font-semibold rounded-xl  shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
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
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  href={singUpLink}
                  className="font-medium text-teal-400 hover:text-teal-300 transition-colors hover:underline inline-flex items-center gap-1"
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

export default  React.memo(LoginForm)