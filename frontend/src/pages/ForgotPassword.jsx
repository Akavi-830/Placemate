import React, { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-hot-toast";
function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/forgot-password", { email });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">Forgot Password</h1>

      <p className="text-center text-gray-500 mb-6">
        Enter your registered email to receive a password reset OTP.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
