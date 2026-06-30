"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Inputs } from "@/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/store/userApi";

const LoginForm = () => {
  const [loginUser] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit = async (data: Inputs) => {
    const email = data?.email;
    const password = data?.password;
    try{
    const response = await loginUser({
      email,
      password,
    }).unwrap();
    toast.success("Login successful!", { position: "top-center" });
    router.replace("/dashboard");
    reset();
    }catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "login failed", {
        position: "top-center",
      })}
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 
      sm:px-6 lg:px-8   font-quicksand"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-800">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your account to continue
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="appearance-none relative block w-full px-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="group relative w-full h-10 flex justify-center py-2.5 px-4 border border-transparent text-md font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Sign in
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-teal-600 hover:text-teal-500 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
