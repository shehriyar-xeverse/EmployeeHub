"use client"
import LoginForm from "@/components/adminAuth/loginFrom";
import { useLoginAdminMutation } from "@/store/admin";


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