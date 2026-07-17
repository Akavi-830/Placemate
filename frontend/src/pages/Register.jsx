import { useState } from "react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      const response = await api.post("/auth/register", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("verifyEmail", response.data.user.email);
        navigate("/verifyEmail", {
          state: {
            email: response.data.user.email,
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>

      <p className="text-gray-500 text-center mb-6">Register to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Please wait..." : "Create Account"}
        </button>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          <span>Already have an account?</span>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
