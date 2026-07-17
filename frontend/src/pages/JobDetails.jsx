import React from "react";
import Container from "../components/Container.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  BrainCircuit,
  FileSearch,
  Target,
  MessageSquareText,
  FilePenLine,
  BookOpenCheck,
  FileText,
  CheckCircle2,
  ClipboardList,
  BadgeCheck,
  Cpu,
  Building2,
  ExternalLink,
} from "lucide-react";
import AiFeatureCard from "../components/ai/AiFeatureCard.jsx";
import AIPopup from "../components/ai/AiPopup.jsx";

function JobDetails() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState("");
  const aiFeatures = [
    {
      type: "resume-match",
      title: "Resume Match",
      icon: Target,
      description:
        "Compare your resume with this job and get an AI compatibility score.",
    },
    {
      type: "interview-qus",
      title: "Interview Questions",
      icon: MessageSquareText,
      description:
        "Generate personalized interview questions based on this job description.",
    },
    {
      type: "cover-letter",
      title: "Cover-letter",
      icon: FileText,
      description: "Generate a cover letter for this job",
    },
  ];
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const { user, setUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const isSaved = user?.savedJobs?.includes(job._id);
  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first to save jobs.");
      navigate("/login");
      return;
    }
    try {
      setSaving(true);
      const response = await api.post(`/saved/job/${id}`);
      if (response.data.success) {
        setUser(response.data.user);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };
  const handleClosePopup = () => {
    setIsOpen(false);
    setSelectedFeature(null);
    setAiResult(null);
    setAiError("");
    setAiLoading(false);
  };

  const fetchJob = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/job/${id}`);
      if (response.data.success) {
        setJob(response.data.job);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to fetch job");
    } finally {
      setLoading(false);
    }
  };
  const checkApplication = async () => {
    if (!user) return;
    try {
      const response = await api.get("/application/user");
      if (response.data.success) {
        const hasApplied = response.data.validApplication.some(
          (application) => application.job._id === id,
        );
        setHasApplied(hasApplied);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  const handleApplyJob = async () => {
    if (!user) {
      toast.error("Please login first.");
      navigate("/login");
      return;
    }

    try {
      setApplying(true);

      const response = await api.post(`/application/apply/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);

        setHasApplied(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setApplying(false);
    }
  };
  useEffect(() => {
    fetchJob();
    if (user) {
      checkApplication();
    }
  }, [id, user]);
  const handleClickFeature = async (feature) => {
    if (!user) {
      toast.error("please login to use this feature");
      navigate("/login");
      return;
    }

    setSelectedFeature(feature);
    setIsOpen(true);
    setAiLoading(true);
    setAiResult(null);
    setAiError("");

    try {
      let response;
      switch (feature.type) {
        case "resume-match":
          response = await api.post(`/ai/resume-match/${id}`);
          break;
        case "interview-qus":
          response = await api.post(`/ai/interview-qus/${id}`);
          break;
        case "cover-letter":
          response = await api.post(`/ai/cover-letter/${id}`);
          break;

        default:
          throw new Error("Invalid AI feature.");
      }
      if (response.data.success) {
        setAiResult(response.data.data);
      }
    } catch (error) {
      setAiError(
        error.response?.data?.message || "Failed to generate AI response.",
      );
    } finally {
      setAiLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-sky-100 to-indigo-50">
      <Container>
        {/* Back Button */}
        <section className="pt-10">
          <button
            onClick={() => navigate("/jobs")}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-blue-600 hover:shadow-lg"
          >
            ← Back to Jobs
          </button>
        </section>

        {/* Hero */}
        <section className="mt-8">
          <div className="rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              {/* Left */}
              <div className="flex items-start gap-6">
                <img
                  src={job.company?.logo}
                  alt={job.company?.name}
                  className="h-24 w-24 rounded-3xl border border-blue-100 bg-white p-3 object-contain shadow-md"
                />

                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    {job.roleName}
                  </h1>

                  <p className="mt-2 text-xl font-semibold text-blue-700">
                    {job.company?.name}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span
                      flex
                      className=" flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      <MapPin size={16} className="text-blue-600" />
                      {job.location}
                    </span>

                    <div></div>
                    <span className=" flex items-center gap-1 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                      <IndianRupee size={16} className="text-blue-600" />{" "}
                      {job.salary}
                      {job.salaryType}
                    </span>

                    <span className="flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
                      <BriefcaseBusiness size={17} className="text-blue-600" />
                      {job.experience}
                    </span>

                    <span className="rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
                      🕒 {job.jobType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleApplyJob}
                  disabled={applying || hasApplied}
                  className={`rounded-2xl px-10 py-4 text-lg font-semibold shadow-xl transition-all duration-300 ${
                    hasApplied
                      ? "cursor-not-allowed border border-green-200 bg-green-50 text-green-700 shadow-green-100"
                      : applying
                        ? "cursor-not-allowed bg-blue-400 text-white opacity-70"
                        : "bg-linear-to-br from-blue-600 to-indigo-600 text-white hover:-translate-y-1 hover:shadow-2xl"
                  }`}
                >
                  {applying
                    ? "Applying..."
                    : hasApplied
                      ? "✓ Applied"
                      : "Apply Now"}
                </button>

                <button
                  onClick={handleSaveJob}
                  disabled={saving}
                  className={`rounded-2xl px-10 py-4 font-semibold transition-all duration-300 ${
                    isSaved
                      ? "border border-green-600 bg-green-50 text-green-700 hover:bg-green-100"
                      : "border border-blue-100 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  } ${saving ? "cursor-not-allowed opacity-60" : ""}`}
                >
                  {saving ? "Saving..." : isSaved ? "✓ Saved" : "Save Job"}
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="rounded-3xl border border-blue-100 bg-white/80 backdrop-blur-xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                🤖 AI Career Assistant
              </h2>

              <p className="mt-2 text-slate-600 max-w-2xl">
                Use AI-powered tools to understand this job better, improve your
                resume and increase your chances of getting shortlisted.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiFeatures.map((feature) => (
                <AiFeatureCard
                  key={feature.title}
                  feature={feature}
                  onClick={handleClickFeature}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="rounded-3xl border border-blue-100 bg-white/80 backdrop-blur-xl shadow-xl p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <FileText className="text-blue-600" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Job Overview
                </h2>

                <p className="mt-1 text-slate-500">
                  Learn more about this opportunity.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6 leading-8 text-slate-700">
              {job.overview}
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="rounded-3xl border border-blue-100 bg-white/80 backdrop-blur-xl shadow-xl p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Responsibilities
                </h2>

                <p className="mt-1 text-slate-500">
                  What you'll be doing in this role.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {job.responsibilities?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-green-50 p-4"
                >
                  <CheckCircle2 size={20} className="mt-1 text-green-600" />

                  <p className="text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            {/* Heading */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                <ClipboardList size={24} className="text-purple-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Job Requirements
                </h2>

                <p className="mt-1 text-slate-500">
                  Skills and qualifications required for this position.
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {job.jobCriteria?.map((criteria, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-purple-100 bg-purple-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                    <BadgeCheck size={20} className="text-purple-600" />
                  </div>

                  <div className="flex-1">
                    <p className="text-base font-medium leading-7 text-slate-700">
                      {criteria}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="mt-10">
          <div className="rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            {/* Heading */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <Cpu size={24} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Tech Stack
                </h2>

                <p className="mt-1 text-slate-500">
                  Technologies you'll work with in this role.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-8 flex flex-wrap gap-4">
              {job.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-blue-200 bg-linear-to-br from-blue-100 to-indigo-100 px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:shadow-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
        <section className="mt-10 pb-10">
          <div className="rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-xl">
            {/* Heading */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
                <Building2 size={24} className="text-indigo-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  About Company
                </h2>

                <p className="mt-1 text-slate-500">
                  Learn more about the organization behind this opportunity.
                </p>
              </div>
            </div>

            {/* Company Card */}
            <div className="mt-8 flex flex-col gap-8 rounded-3xl border border-blue-100 bg-linear-to-br from-white via-blue-50 to-indigo-50 p-8 lg:flex-row lg:items-center">
              {/* Logo */}
              <div className="flex justify-center lg:justify-start">
                <img
                  src={job.company?.logo}
                  alt={job.company?.name}
                  className="h-28 w-28 rounded-3xl border border-blue-100 bg-white p-4 object-contain shadow-md"
                />
              </div>

              {/* Company Details */}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-slate-900">
                  {job.company?.name}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  We are building innovative products and looking for passionate
                  individuals who love solving real-world problems. Join our
                  team and grow your career with exciting opportunities.
                </p>

                {/* Website */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <span className="rounded-xl border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                    🌐 {job.company?.website}
                  </span>

                  <a
                    href={job.company?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                  >
                    Visit Website
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
      <AIPopup
        open={isOpen}
        feature={selectedFeature}
        loading={aiLoading}
        result={aiResult}
        error={aiError}
        onClose={handleClosePopup}
      />
    </div>
  );
}
export default JobDetails;
