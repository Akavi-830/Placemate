import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="group rounded-3xl border border-blue-100 bg-white/80 p-6 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src={job.company?.logo}
            alt={job.company?.name}
            className="h-14 w-14 rounded-2xl border border-slate-100 bg-white object-contain p-2 shadow-sm"
          />

          <div>
            <p className="text-lg font-bold text-slate-900 line-clamp-1">
              {job.roleName}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {job.company?.name}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold text-blue-700">
          {job.jobType}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-slate-200"></div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={18} className="text-blue-600" />
          <span>{job.experience}</span>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee size={18} className="text-blue-600" />
          <span>
            ₹ {job.salary}
            {job.salaryType}
          </span>
        </div>

        <div className="flex items-center">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Active
          </span>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-6 flex flex-wrap gap-2">
        {job.techStack?.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Button */}
      <Link
        to={`/jobs/${job._id}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-blue-600 py-3 font-semibold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white"
      >
        View Details
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default JobCard;
