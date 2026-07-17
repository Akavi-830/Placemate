import React from "react";
import Container from "../Container.jsx";
import { useNavigate } from "react-router-dom";

function Hero() {
  const popularSkills = [
    "React",
    "Node.js",
    "Java",
    "Python",
    "MERN",
    "Remote",
  ];

  const stats = [
    { value: "10K+", label: "Active Jobs" },
    { value: "500+", label: "Companies" },
    { value: "25K+", label: "Candidates" },
  ];
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            🚀 AI Powered Job Portal
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 lg:text-6xl">
            Land Your Dream Job with PlaceMate AI
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 lg:text-lg">
            Discover jobs faster with AI-powered resume analysis, smart job
            matching, personalized recommendations, and interview preparation—
            all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700"
              onClick={() => navigate("/jobs")}
            >
              Explore Jobs
            </button>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-3xl font-bold text-blue-600">
                  {item.value}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Popular Skills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Trending Skills
            </span>

            {popularSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
