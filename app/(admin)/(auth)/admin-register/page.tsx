"use client";
import {
  useRegisterAdminMutation,
  useVerfiyAdminOTPMutation,
} from "@/store/admin";
import { RegisterInputs } from "@/types/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = dynamic(
  () => import("@/components/adminAuth/registerForm"),
);
const OTPVerification = dynamic(
  () => import("@/components/adminAuth/otpVerification"),
);

const Register = () => {
  const [registerUser] = useRegisterAdminMutation();
  const [verfiyAdminOTP] = useVerfiyAdminOTPMutation();
  const [isOTP, setIsOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const router = useRouter();
  const onSubmit = async (data: RegisterInputs) => {
    const { name, email, password } = data;
    setUserName(name);
    setUserEmail(email);
    setUserPassword(password);
    setIsLoading(true);
    try {
      const response = await registerUser({
        name,
        email,
        password,
      }).unwrap();
      toast.success("OTP Send Your Email Check it  Now!", {
        position: "top-center",
      });
      setIsOTP(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "OTP Send failed", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }
    setOtpLoading(true);
    try {
      const response = await verfiyAdminOTP({
        name: userName,
        email: userEmail,
        password: userPassword,
        otp,
      }).unwrap();
      toast.success(response.message || "OTP Verified", {
        position: "top-center",
      });
      router.push("/admin-login");
    } catch (error: any) {
      toast.error(error?.data?.message || "OTP Verification Failed", {
        position: "top-center",
      });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    console.log("Resending OTP...");
  };


  
  return (
    <div>
      {!isOTP ? (
        <RegisterForm
          loginLink={"/admin-login"}
          heading={"Admin"}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          register={register}
          isLoading={isLoading}
        />
      ) : (
        <div>
          <OTPVerification
            email={userEmail}
            handleResendOTP={handleResendOTP}
            handleVerifyOTP={handleVerifyOTP}
            otp={otp}
            setOtp={setOtp}
            isLoading={otpLoading}
          />
        </div>
      )}
    </div>
  );
};

export default Register;
