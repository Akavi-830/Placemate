import React from "react";
import AuthLayout from "../components/auth/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import AuthInput from "../components/auth/AuthInput.jsx";
import PasswordInput from "../components/auth/PasswordInput.jsx";

function Login() {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
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
      const response = await api.post("/auth/login", formData);
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>

      <p className="text-center text-gray-500 mb-6">Login to continue</p>

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

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2.5 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-2 text-sm">
        <span>Don't have an account?</span>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="font-medium text-blue-600 hover:underline"
        >
          Register
        </button>
      </div>
    </AuthLayout>
  );
}

export default Login;
