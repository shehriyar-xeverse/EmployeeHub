"use client"
import { useLoginEmployeeMutation } from "@/store/employeeProfile";
import dynamic from "next/dynamic";
const  LoginForm = dynamic(() => import('@/components/adminAuth/loginFrom'))

const Login = () => {
const [loginEmployee] = useLoginEmployeeMutation()
  
  return (
 <div>
  <LoginForm 
  loginUser={loginEmployee}
  navigation={'/employee-dashboard'}
  singUpLink={'/register'}
  heading={'Employee'}
  />
  
 </div>
  );
};

export default Login;