import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  BriefcaseBusiness,
  FileText,
  Clock3,
  CircleCheckBig,
  CircleX,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    acceptedApplications: 0,
    rejectedApplications: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentApplications, setRecentApplications] = useState([]);

  const statsCard = [
    {
      title: "Total Companies",
      value: stats.totalCompanies,
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      icon: BriefcaseBusiness,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending",
      value: stats.pendingApplications,
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Accepted",
      value: stats.acceptedApplications,
      icon: CircleCheckBig,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Rejected",
      value: stats.rejectedApplications,
      icon: CircleX,
      color: "bg-red-100 text-red-600",
    },
  ];

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchRecentApplications = async () => {
    try {
      const response = await api.get("/admin/recent-applications");

      if (response.data.success) {
        setRecentApplications(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchRecentApplications();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Welcome Back, {user?.name} 👋
        </h1>

        <p className="mt-3 text-slate-600">
          Manage companies, jobs and applications from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {statsCard.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500">{item.title}</p>
                  <h2 className="mt-3 text-4xl font-bold">{item.value}</h2>
                </div>

                <div className={`rounded-2xl p-4 ${item.color}`}>
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-5 text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <button
            className="rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            onClick={() => navigate("/companies/new")}
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Add Company
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Create a new company profile.
            </p>
          </button>

          <button
            className="rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            onClick={() => navigate("/jobs/new")}
          >
            <h3 className="text-lg font-semibold text-slate-900">Post Job</h3>
            <p className="mt-2 text-sm text-slate-500">
              Publish a new job opening.
            </p>
          </button>

          <button
            className="rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            onClick={() => navigate("/applications")}
          >
            <h3 className="text-lg font-semibold text-slate-900">
              View Applications
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Review candidate applications.
            </p>
          </button>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="rounded-2xl border bg-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Applications
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Candidate
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Job
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Applied On
                </th>
              </tr>
            </thead>

            <tbody>
              {recentApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                recentApplications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{application.user?.name}</td>

                    <td className="px-6 py-4">{application.job?.roleName}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium
              ${
                application.status === "accepted"
                  ? "bg-green-100 text-green-700"
                  : application.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
              }`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
