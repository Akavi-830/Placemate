import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { toast } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/company");
      if (response.data.success) {
        setCompanies(response.data.companies);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleClick = () => {
    navigate("/companies/new");
  };
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/company/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);

        fetchCompanies();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete company");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Companies</h1>

          <p className="text-gray-500 mt-1">Manage all registered companies.</p>
        </div>
        <button
          onClick={handleClick}
          className=" flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Add Company
        </button>
      </div>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Company
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                website
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Created
              </th>

              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? (
              companies.map((company) => (
                <tr
                  key={company._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="px-6 py-4">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {company.website}
                    </a>
                  </td>

                  <td className="px-6 py-4">{company.createdAt}</td>

                  <td className="px-6 py-4 text-center ">
                    <div className=" flex items-center justify-center gap-4">
                      <button
                        onClick={() => navigate(`/company/${company._id}`)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(company._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-500">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Companies;
