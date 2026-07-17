import { useState, useEffect, React } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios.js";
import Spinner from "../components/Spinner.jsx";
import Container from "../components/Container.jsx";
import JobCard from "../components/Jobs/JobCard.jsx";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    jobType: "",
    category: "",
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/job", {
        params: {
          search,
          jobType: filters.jobType,
          category: filters.category,
        },
      });
      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleFilters = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleClearFilters = () => {
    setFilters({
      jobType: "",
      category: "",
    });
  };
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const categories = [...new Set(jobs.map((job) => job.category))];
  const jobTypes = [...new Set(jobs.map((job) => job.jobType))];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-100 to-indigo-50">
      <Container>
        <section className="py-16">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-medium border border-blue-200">
              Find Your Next Opportunity
            </span>

            <h1 className="mt-6 text-5xl font-extrabold text-slate-900 leading-tight">
              Find Your Dream Job
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-lg leading-8 text-slate-600">
              Discover thousands of curated opportunities, connect with top
              companies and accelerate your career with AI.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-blue-100 shadow-xl p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search jobs, skills, company or location..."
                className="flex-1 rounded-2xl border border-blue-100 bg-white px-5 py-4 text-slate-700 placeholder:text-slate-400 outline-none transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={fetchJobs}
                className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:from-blue-700 hover:to-indigo-700"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={filters.category}
                onChange={(e) => handleFilters("category", e.target.value)}
                className="rounded-2xl border border-blue-100 bg-white/90 px-5 py-3 text-slate-700 shadow-sm outline-none transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value=""> All Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={filters.jobType}
                onChange={(e) => handleFilters("jobType", e.target.value)}
                className="rounded-2xl border border-blue-100 bg-white/90 px-5 py-3 text-slate-700 shadow-sm outline-none transition duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">All Job Types</option>
                {jobTypes.map((jobType) => (
                  <option key={jobType} value={jobType}>
                    {jobType}
                  </option>
                ))}
              </select>

              <button
                onClick={handleClearFilters}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Clear Filters
              </button>
            </div>

            <div className="rounded-2xl bg-blue-200 border border-blue-100 px-5 py-3">
              <p className="text-md text-slate-700">Available Jobs</p>
              <h2 className="text-xl font-bold text-slate-900">
                {jobs.length}
              </h2>
            </div>
          </div>
        </section>

        <section className="pb-16">
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </section>
      </Container>
    </div>
  );
}

export default Jobs;
