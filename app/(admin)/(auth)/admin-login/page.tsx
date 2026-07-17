"use client"
import { useLoginAdminMutation } from "@/store/admin";
import dynamic from "next/dynamic";
const  LoginForm = dynamic(() => import('@/components/adminAuth/loginFrom'))

const Login = () => {
const [loginUser] = useLoginAdminMutation()
  return (
 <div>
  <LoginForm 
  loginUser={loginUser}
  navigation={'/admin-dashboard'}
  singUpLink={'/admin-register'}
  heading={'Admin'}
  />
 </div>
  );
};

export default Login;