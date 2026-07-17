import React, { useState, useEffect } from "react";
import { Pencil, Trash2, CircleCheck } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchJobs = async () => {
    try {
      const response = await api.get("/job?admin=true");
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }
  const handleClick = () => {
    navigate("/jobs/new");
  };
  const toggleJobStatus = async (id) => {
    try {
      const response = await api.patch(`/job/${id}/close`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchJobs();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update the status",
      );
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/job/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);

        fetchJobs();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Left Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>

          <p className="mt-1 text-gray-500">Manage all job postings.</p>
        </div>

        {/* Right Section */}
        <div>
          <button
            onClick={handleClick}
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Add Job
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Company
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Location
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No jobs found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {/* Company */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <span className="font-medium text-gray-800">
                        {job.company.name}
                      </span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">{job.roleName}</td>

                  {/* Location */}
                  <td className="px-6 py-4">{job.location}</td>

                  {/* Salary */}
                  <td className="px-6 py-4">
                    ₹{job.salary} {job.salaryType}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => navigate(`/jobs/${job._id}`)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>

                      {job.status === "active" && (
                        <button
                          onClick={() => toggleJobStatus(job._id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <CircleCheck size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobs;
