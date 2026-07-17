"use client"
import { useRegisterAdminMutation } from "@/store/admin";
import dynamic from "next/dynamic";





const  RegisterForm = dynamic(() => import('@/components/adminAuth/registerForm'))

const Register = () => {
  const [registerUser] = useRegisterAdminMutation()
  return (
   <div>
    <RegisterForm
    navigation={'/admin-login'}
    registerUser={registerUser}
    loginLink={'/admin-login'}
    heading={'Admin'}

    /> 
    </div>
  );
};

export default Register;