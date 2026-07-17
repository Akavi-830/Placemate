import Container from "../Container.jsx";
import { UserPlus, Search, FileText, Sparkles, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up and complete your profile to unlock personalized job recommendations.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Browse Jobs",
    description:
      "Explore opportunities through featured jobs, search or smart filters.",
    icon: Search,
  },
  {
    number: "03",
    title: "Open Job Details",
    description:
      "Review responsibilities, required skills, salary and company information before applying.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Analyze with AI",
    description:
      "Upload your resume if not uploaded and let AI compare it with the selected job, identify missing skills and generate interview questions.",
    icon: Sparkles,
  },
  {
    number: "05",
    title: "Apply with Confidence",
    description:
      "Use AI insights to improve your resume and submit your application with confidence.",
    icon: Send,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <Container>
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-slate-900">How It Works</h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            A simple AI-powered workflow that helps you discover the right
            opportunity, prepare smarter and apply with confidence.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mx-auto mt-20 max-w-5xl">
          {/* Vertical Line */}

          <div className="absolute left-7 top-0 h-full w-1 rounded-full bg-linear-to-br from-blue-600 via-sky-500 to-blue-200"></div>

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative mb-10 flex items-start gap-6"
              >
                {/* Icon */}

                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-300">
                  <Icon size={24} />
                </div>

                {/* Card */}

                <div className="group relative flex-1 overflow-hidden rounded-3xl border border-blue-100 bg-white/80 p-8 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl">
                  {/* Hover Strip */}

                  <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-blue-600 transition-transform duration-300 group-hover:scale-y-100"></div>

                  <span className="text-sm font-semibold tracking-widest text-blue-600">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;
