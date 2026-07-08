"use client"
import { useRegisterAdminMutation } from "@/store/admin";

import RegisterForm from '@/components/adminAuth/registerForm';

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