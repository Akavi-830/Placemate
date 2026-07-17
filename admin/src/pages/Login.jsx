import React, { useContext } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from "react-hot-toast";

function Login() {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl ">
        <div className="flex justify-center pt-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <BriefcaseBusiness className="h-7 w-7 text-white" />
          </div>
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your admin account
          </p>
        </div>
        <div></div>
        <form onSubmit={handleSubmit} className="mt-8 px-8 pb-8 space-y-5">
          {/* Email */}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
export default Login;
