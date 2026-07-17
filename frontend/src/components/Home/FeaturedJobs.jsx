import Container from "../Container.jsx";
import { useState, useEffect, React } from "react";
import { toast } from "react-hot-toast";
import api from "../../api/axios.js";
import Spinner from "../Spinner.jsx";
import JobCard from "../Jobs/JobCard.jsx";
const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const getFeaturedJobs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/job?limit=6");
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
    getFeaturedJobs();
  }, []);

  return (
    <section className="py-5">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
            Featured Jobs
          </h2>

          <p className="mt-4 text-slate-600">
            Explore the latest opportunities from top companies.
          </p>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default FeaturedJobs;
