import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { toast } from "react-hot-toast";

function AddCompany() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    logo: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileSubmit = (e) =>
    setFormData({ ...formData, logo: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const companyData = new FormData();
      companyData.append("name", formData.name);
      companyData.append("website", formData.website);
      if (formData.logo) companyData.append("logo", formData.logo);

      const response = await api.post("/company", companyData);
      if (response.data?.success) {
        toast.success(response.data.message || "Company created");
        navigate("/companies");
      } else {
        toast.error(response.data?.message || "Failed to create company");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Company
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add a new company to the platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>
            <input
              id="text"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Acme Corp"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="logo"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              id="logo"
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Logo
            </label>
            <input
              type="file"
              name="logo"
              onChange={handleFileSubmit}
              accept="image/*"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/companies")}
              className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
