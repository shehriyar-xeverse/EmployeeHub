"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock, CheckCircle, Loader2 } from "lucide-react";


const OTPVerification = ({
  email = "user@example.com",
  onResendOTP,
  onVerifyOTP,
  navigate = "/dashboard",
}: any) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter complete 6-digit OTP", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    try {
      if (onVerifyOTP) {
        await onVerifyOTP(otp);
      }
      toast.success("OTP Verified Successfully!", { position: "top-center" });
      router.push(navigate);
    } catch (error: any) {
      toast.error(error?.message || "Invalid OTP. Please try again.", { 
        position: "top-center" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsResending(true);
    try {
      if (onResendOTP) {
        await onResendOTP();
      }
      toast.success("OTP resent successfully!", { position: "top-center" });
      setTimer(30);
      setCanResend(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend OTP", { 
        position: "top-center" 
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8 font-quicksand relative overflow-hidden">
      <div className="max-w-md w-full relative z-10">
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-8 rounded-2xl border border-gray-800/50 shadow-2xl shadow-teal-500/5 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-500 bg-clip-text text-transparent">
              OTP Verification
            </h2>
            <p className="mt-2 text-gray-400 text-sm">
              Enter the 6-digit OTP sent to{" "}
              <span className="text-teal-400 font-medium">{email}</span>
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-14 text-center text-xl font-semibold text-white bg-[#0a0a0a] border border-gray-700/50 rounded-xl focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-300"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-teal-400" />
              <span>
                {timer > 0 ? (
                  <>Resend in <span className="text-teal-400 font-semibold">{timer}s</span></>
                ) : (
                  <span className="text-green-400">Ready to resend</span>
                )}
              </span>
            </div>
            <button
              onClick={handleResend}
              disabled={!canResend || isResending}
              className={`text-sm font-medium transition-all duration-300 ${
                canResend && !isResending
                  ? "text-teal-400 hover:text-teal-300 hover:underline cursor-pointer"
                  : "text-gray-500 cursor-not-allowed opacity-50"
              }`}
            >
              {isResending ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Resend OTP"
              )}
            </button>
          </div>
          <Button
            onClick={handleVerify}
            disabled={isLoading || otp.length !== 6}
            className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-teal-500/30 hover:shadow-teal-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify OTP
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
          <div className="text-center pt-4">
            <p className="text-sm text-gray-400">
              Didn't receive OTP?{" "}
              <button
                onClick={handleResend}
                disabled={!canResend || isResending}
                className={`font-medium transition-colors hover:underline ${
                  canResend && !isResending
                    ? "text-teal-400 hover:text-teal-300 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Click here to resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OTPVerification);