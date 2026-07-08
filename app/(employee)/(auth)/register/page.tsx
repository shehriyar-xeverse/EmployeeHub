"use client"
import RegisterForm from '@/components/adminAuth/registerForm';
import { useSignUpEmployeeMutation } from '@/store/employeeProfile';

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