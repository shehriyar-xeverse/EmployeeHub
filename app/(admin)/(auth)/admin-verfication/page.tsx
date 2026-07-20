"use client";
import { useLoginAdminMutation } from "@/store/admin";
import dynamic from "next/dynamic";

const OTPVerification = dynamic(() => import('@/components/adminAuth/otpVerification'));

const AdminVerification = () => {
  const [loginUser] = useLoginAdminMutation();
  const handleVerifyOTP = async (otp: string) => {
    console.log("Verifying OTP:", otp);
  };

  const handleResendOTP = async () => {
    console.log("Resending OTP...");
  };

  return (
    <div>
      <OTPVerification
        email="admin@example.com"
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={handleResendOTP}
        navigate="/admin-dashboard"
      />
    </div>
  );
};

export default AdminVerification;