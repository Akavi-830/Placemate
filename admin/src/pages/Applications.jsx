import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchApplications = async () => {
    try {
      const response = await api.get("/application/admin");

      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await api.patch(`/application/${id}/status`, {
        status,
      });

      if (response.data.success) {
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application._id === id ? { ...application, status } : application,
          ),
        );
        toast.success("Application status updated.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update application status.",
      );
    }
  };
  useEffect(() => {
    fetchApplications();
  }, []);
  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-lg font-medium">
        Loading applications...
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-900">Applications</h1>

        <p className="mt-2 text-slate-600">
          Review all job applications and update their status.
        </p>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Candidate
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Job
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Company
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Applied On
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={application._id}
                    className="border-t hover:bg-slate-50"
                  >
                    {/* Candidate */}

                    <td className="px-6 py-4 font-medium text-slate-800">
                      {application.user?.name}
                    </td>

                    {/* Email */}

                    <td className="px-6 py-4 text-slate-600">
                      {application.user?.email}
                    </td>

                    {/* Job */}

                    <td className="px-6 py-4">{application.job?.roleName}</td>

                    {/* Company */}

                    <td className="px-6 py-4">
                      {application.job?.company?.name}
                    </td>

                    {/* Applied Date */}

                    <td className="px-6 py-4">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <select
                        value={application.status}
                        onChange={(e) =>
                          updateApplicationStatus(
                            application._id,
                            e.target.value,
                          )
                        }
                        className={`rounded-lg border px-3 py-2 text-sm font-medium
  ${
    application.status === "accepted"
      ? "border-green-300 bg-green-50 text-green-700"
      : application.status === "rejected"
        ? "border-red-300 bg-red-50 text-red-700"
        : "border-yellow-300 bg-yellow-50 text-yellow-700"
  }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
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

export default Applications;
