import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    logo: null,
  });

  const fetchCompany = async () => {
    try {
      const response = await api.get(`/company/${id}`);
      if (response.data.success) {
        const company = response.data.company;
        setFormData({
          name: company.name,
          website: company.website,
          logo: null,
        });
      } else {
        toast.error(response.data.message || "Failed to fetch company");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch company");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileSubmit = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    });
  };
  useEffect(() => {
    fetchCompany();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const companyData = new FormData();
      companyData.append("name", formData.name);
      companyData.append("website", formData.website);
      if (formData.logo) {
        companyData.append("logo", formData.logo);
      }
      const response = await api.put(`/company/${id}`, companyData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/companies");
      } else {
        toast.error(response.data.message || "Failed to update company");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update company");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">Update Company</h1>

        <p className="text-gray-500 mt-1">Update the company details.</p>
      </div>

      {/* 👇 Form yahin se start hoga */}
      <form onSubmit={handleSubmit}>
        {/* Card */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm p-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter company name"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>

            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-6">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Company Logo
            </label>

            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleFileSubmit}
              className="mt-2 block w-full text-sm text-gray-600"
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => navigate("/companies")}
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Update Company
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCompany;
