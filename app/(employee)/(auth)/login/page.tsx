"use client"
import LoginForm from "@/components/adminAuth/loginFrom";
import { useLoginEmployeeMutation } from "@/store/employeeProfile";


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