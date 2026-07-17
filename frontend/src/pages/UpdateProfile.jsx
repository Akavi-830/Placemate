import React, { useEffect, useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-hot-toast";

function UpdateProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        resume: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files[0];

      // Validate file type
      if (file) {
        if (file.type !== "application/pdf") {
          toast.error("Only PDF files are allowed");
          return;
        }

        if (!file.name.toLowerCase().endsWith(".pdf")) {
          toast.error("File must have .pdf extension");
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast.error("File size must be less than 10MB");
          return;
        }

        console.log("✅ Valid PDF file selected:", {
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }

      setFormData((prev) => ({
        ...prev,
        resume: file || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedData = new FormData();

      updatedData.append("name", formData.name);
      updatedData.append("email", formData.email);

      if (formData.resume) {
        console.log("📎 Adding resume file:", {
          name: formData.resume.name,
          size: formData.resume.size,
          type: formData.resume.type,
        });
        updatedData.append("resume", formData.resume);
      }

      console.log("📤 Sending profile update request...");
      const response = await api.put("/user/profile", updatedData);

      console.log("✅ Server response:", response.data);

      if (response.data.success) {
        setUser(response.data.user);

        toast.success(response.data.message);

        navigate("/profile");
      }
    } catch (error) {
      console.error("❌ Upload error:", {
        message: error.message,
        responseStatus: error.response?.status,
        responseData: error.response?.data,
        fullError: error,
      });

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Update Profile</h1>

          <p className="mt-2 text-slate-600">
            Update your account information and resume.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Upload Resume (PDF only)
              </label>

              <div className="mb-2 text-xs text-slate-500">
                {formData.resume ? (
                  <span className="text-green-600">
                    ✓ {formData.resume.name}
                  </span>
                ) : (
                  <span>Please upload a valid PDF file (Max 10MB)</span>
                )}
              </div>

              <input
                type="file"
                name="resume"
                accept=".pdf,application/pdf"
                onChange={handleChange}
                className="block w-full rounded-lg border border-slate-300 px-3 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UpdateProfile;
