import { Link } from "react-router-dom";
import Container from "../Container.jsx";

const CTA = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-blue-400 via-sky-400 to-blue-400 px-8 py-16 text-center shadow-2xl">
          {/* Decorative Blur Circles */}
          <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>

          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur-sm">
              🚀 AI-Powered Career Platform
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-5xl">
              Ready to Land Your Dream Job?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Discover opportunities, analyze your resume with AI and apply
              confidently—all in one modern platform built to help you succeed.
            </p>

            <Link
              to="/jobs"
              className="mt-10 inline-flex items-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Start Exploring Jobs
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
