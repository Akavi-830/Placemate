import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { toast } from "react-hot-toast";

function Profile() {
  const { setUser, user } = useAuth();

  const navigate = useNavigate();
  const getProfile = async () => {
    try {
      const response = await api.get("/user/profile");
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 via-sky-50 to-indigo-100 py-10">
      <div className="mx-auto max-w-3xl px-4">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">My Profile</h1>
          <p className="mt-2 text-slate-600">
            Manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-blue-100 bg-white p-8 shadow-lg">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <p className="mb-1 text-sm font-medium text-slate-500">Name</p>

              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
                {user?.name}
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="mb-1 text-sm font-medium text-slate-500">Email</p>

              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
                {user?.email}
              </div>
            </div>

            {/* Resume */}
            <div>
              <p className="mb-1 text-sm font-medium text-slate-500">Resume</p>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-slate-700">
                  {user?.resume ? "Resume Uploaded" : "No Resume Uploaded"}
                </span>

                {user?.resume && (
                  <button
                    onClick={() => window.open(user.resume, "_blank")}
                    type="button"
                    className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                  >
                    View Resume
                  </button>
                )}
              </div>
            </div>

            {/* Edit Button */}
            <div className="pt-4">
              <button
                onClick={() => navigate("/update-profile")}
                type="button"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
