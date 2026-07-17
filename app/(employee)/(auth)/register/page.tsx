"use client"
import { useSignUpEmployeeMutation } from '@/store/employeeProfile';
import dynamic from "next/dynamic";
const  RegisterForm = dynamic(() => import('@/components/adminAuth/registerForm'))

const Register = () => {
  const [signUpEmployee]  = useSignUpEmployeeMutation()
  return (
   <div>
    <RegisterForm
    navigation={'/login'}
    registerUser={signUpEmployee}
    loginLink={'/login'}
    heading={'Employee'}

    /> 
    </div>
  );
};

export default Register;