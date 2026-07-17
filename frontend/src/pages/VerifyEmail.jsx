import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import AuthInput from "../components/auth/AuthInput";
import Spinner from "../components/Spinner.jsx";

function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("verifyEmail");
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    if (!email && !isVerified) {
      toast.error("please register first");
      navigate("/register");
    }
  }, [email, isVerified, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/verify-email", { email, otp });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsVerified(true);
        localStorage.removeItem("verifyEmail");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">Verify Email</h1>

      <p className="text-center text-gray-500 mb-1">
        We've sent a 6-digit verification code to
      </p>

      <p className="text-center font-medium mb-6 break-all">{email}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Verification Code"
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2.5 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default VerifyEmail;
