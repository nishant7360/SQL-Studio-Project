import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword, verifyOTP, resetPassword } from "@/services/apiAuth";
import ForgotPasswordLayout from "@/features/auth/ForgotPasswordLayout";
import EmailStep from "./EmailStep";
import OtpStep from "@/features/auth/OtpStep";
import ResetPasswordStep from "@/features/auth/ResetPasswordStep";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSendOtp(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(email);
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await verifyOTP(email, otp);
      toast.success("OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(email, otp, newPassword);
      toast.success("Password reset successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ForgotPasswordLayout step={step}>
      {step === 1 && (
        <EmailStep
          email={email}
          setEmail={setEmail}
          onSubmit={handleSendOtp}
          isLoading={isLoading}
        />
      )}
      {step === 2 && (
        <OtpStep
          email={email}
          otp={otp}
          setOtp={setOtp}
          onSubmit={handleVerifyOtp}
          onBack={() => setStep(1)}
          isLoading={isLoading}
        />
      )}
      {step === 3 && (
        <ResetPasswordStep
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          onSubmit={handleResetPassword}
          isLoading={isLoading}
        />
      )}
    </ForgotPasswordLayout>
  );
}

export default ForgotPassword;
