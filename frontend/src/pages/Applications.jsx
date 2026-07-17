import {
  MapPin,
  IndianRupee,
  BriefcaseBusiness,
  CalendarDays,
  CircleDashed,
  CircleCheckBig,
  CircleX,
  ArrowRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import Spinner from "../components/Spinner.jsx";
import Container from "../components/Container.jsx";
function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const getUserApplications = async () => {
    try {
      const response = await api.get("/application/user");
      console.log("API RESPONSE:", response.data);

      if (response.data.success) {
        setApplications(response.data.validApplication);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applications",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserApplications();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 via-sky-100 to-indigo-50 py-10">
      <Container>
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">My Applications</h1>

          <p className="mt-2 text-slate-600">
            Track all the jobs you've applied for.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-blue-200 bg-white/80 py-20 text-center shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800">
              No Applications Yet
            </h2>

            <p className="mt-3 text-slate-500">
              You haven't applied for any jobs yet. Explore jobs and submit your
              first application.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* Left */}
                  <div className="flex gap-5">
                    <img
                      src={application.job.company.logo}
                      alt={application.job.company.name}
                      className="h-20 w-20 rounded-2xl border border-slate-200 bg-white p-2 object-contain"
                    />

                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {application.job.roleName}
                      </h2>

                      <p className="mt-1 text-lg font-medium text-blue-600">
                        {application.job.company.name}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">
                          <MapPin size={16} />
                          <span>{application.job.location}</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm text-green-700">
                          <IndianRupee size={16} />
                          <span>
                            {application.job.salary}
                            {application.job.salaryType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm text-purple-700">
                          <BriefcaseBusiness size={16} />
                          <span>{application.job.jobType}</span>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                        <CalendarDays size={16} />
                        <span>
                          Applied on{" "}
                          {new Date(application.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-start gap-4 lg:items-end">
                    <span
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                        application.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : application.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {application.status === "pending" && (
                        <CircleDashed size={16} />
                      )}

                      {application.status === "accepted" && (
                        <CircleCheckBig size={16} />
                      )}

                      {application.status === "rejected" && (
                        <CircleX size={16} />
                      )}

                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>

                    <button
                      onClick={() => navigate(`/jobs/${application.job._id}`)}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Job
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default Applications;
