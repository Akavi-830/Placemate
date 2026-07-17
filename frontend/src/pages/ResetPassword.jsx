import React from "react";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../components/auth/PasswordInput";

function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/reset-password", formData);
      if (response.data.success) {
        toast.success(response.data.message);
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
      <h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>

      <p className="text-center text-gray-500 mb-6">
        Enter your email, OTP, and new password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <AuthInput
          label="OTP"
          type="text"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
          placeholder="Enter 6-digit OTP"
          maxLength={6}
          required
        />

        <PasswordInput
          label="New Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your new password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Resetting Password..." : "Reset Password"}
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

export default ResetPassword;
