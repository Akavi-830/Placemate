import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [formData, setFormData] = useState({
    roleName: "",
    company: "",
    techStack: "",
    location: "",
    experience: "",
    salary: "",
    salaryType: "/month",
    jobType: "",
    postDate: "",
    category: "",
    openings: "",
    overview: "",
    responsibilities: "",
    jobCriteria: "",
    education: "",
  });
  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company");

      if (response.data.success) {
        setCompanies(response.data.companies);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch companies");
    } finally {
      setLoadingCompanies(false);
    }
  };
  const formatDateValue = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
  };

  const toTextAreaValue = (value) => {
    if (Array.isArray(value)) {
      return value.join("\n");
    }
    return value || "";
  };

  const fetchJob = async (id) => {
    try {
      const response = await api.get(`/job/${id}`);
      if (response.data.success) {
        const job = response.data.job;
        setFormData({
          roleName: job.roleName || "",
          company: job.company?._id || job.company || "",
          techStack: toTextAreaValue(job.techStack),
          location: job.location || "",
          experience: job.experience || "",
          salary: job.salary || "",
          salaryType: job.salaryType || "/month",
          jobType: job.jobType || "",
          postDate: formatDateValue(job.postDate),
          category: job.category || "",
          openings: job.openings || "",
          overview: job.overview || "",
          responsibilities: toTextAreaValue(job.responsibilities),
          jobCriteria: toTextAreaValue(job.jobCriteria),
          education: toTextAreaValue(job.education),
        });
      } else {
        toast.error(response.data.message || "Failed to fetch job");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch job");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  useEffect(() => {
    fetchJob(id);
  }, [id]);

  if (loadingCompanies) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,

      techStack: formData.techStack
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      responsibilities: formData.responsibilities
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      jobCriteria: formData.jobCriteria
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),

      education: formData.education
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const response = await api.put(`/job/${id}`, jobData);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Edit your Job</h1>
          <p className="mt-2 text-gray-500">Change the following data.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Company */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Company
            </label>

            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Company</option>

              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role Name */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Role Name
            </label>

            <input
              type="text"
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
              placeholder="Frontend Developer"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Bangalore"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="50000"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Salary Type */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Salary Type
            </label>

            <select
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="/month">Per Month</option>
              <option value="/year">Per Year</option>
              <option value="/hour">Per Hour</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Experience
            </label>

            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="2 Years"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Job Type
            </label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* Post Date */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Post Date
            </label>

            <input
              type="date"
              name="postDate"
              value={formData.postDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Software Development"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Openings */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Openings
            </label>

            <input
              type="number"
              name="openings"
              value={formData.openings}
              onChange={handleChange}
              placeholder="5"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Tech Stack
            </label>

            <textarea
              rows={3}
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, Express"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Overview */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Overview
            </label>

            <textarea
              rows={5}
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Write a brief overview about this job..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Responsibilities */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Responsibilities
            </label>

            <textarea
              rows={4}
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="One responsibility per line"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Job Criteria */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Job Criteria
            </label>

            <textarea
              rows={4}
              name="jobCriteria"
              value={formData.jobCriteria}
              onChange={handleChange}
              placeholder="One criteria per line"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Education */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-700">
              Education
            </label>

            <textarea
              rows={3}
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="B.Tech, MCA, BCA"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 md:col-span-2">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="..."
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
