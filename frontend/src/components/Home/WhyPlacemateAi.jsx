import React from "react";
import Container from "../Container.jsx";

function WhyPlacemateAi() {
  const features = [
    {
      title: "AI Resume Analysis",
      description:
        "Analyze your resume against any job description and identify missing skills before applying.",
    },
    {
      title: "AI Interview Preparation",
      description:
        "Generate personalized interview questions based on the selected job role.",
    },
    {
      title: "Quick & Secure Applications",
      description:
        "Apply faster with a simple, secure and seamless application process.",
    },
  ];
  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
            Why Choose PlaceMate AI?
          </h2>

          <p className="mt-4 text-slate-600">
            Everything you need to discover better opportunities, prepare
            smarter and apply with confidence.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-blue-100 bg-white/70 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyPlacemateAi;
