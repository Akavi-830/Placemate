import React, { useEffect, useState } from "react";
import JobCard from "../components/Jobs/JobCard.jsx";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container.jsx";
import api from "../api/axios.js";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner.jsx";

function SavedJobs() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);

  const getSavedJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/saved");
      if (response.data.success) {
        setSavedJobs(response.data.savedJobs);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to fetch job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 via-sky-100 to-indigo-50 py-10">
      <Container>
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Saved Jobs</h1>

          <p className="mt-2 text-slate-600">
            Keep track of the jobs you've saved for later.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <Spinner />
        ) : savedJobs.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-white/70 py-24 text-center shadow-lg backdrop-blur">
            <h2 className="text-2xl font-bold text-slate-800">No Saved Jobs</h2>

            <p className="mt-3 max-w-md text-slate-500">
              You haven't saved any jobs yet. Explore available jobs and save
              the ones you're interested in.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          /* Job Grid */
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {savedJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export default SavedJobs;
