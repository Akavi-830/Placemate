import React from "react";
import { Loader2, CheckCircle2, XCircle, CircleHelp } from "lucide-react";

function AIPopup({ open, feature, loading, result, error, onClose }) {
  if (!open || !feature) return null;

  const Icon = feature.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-blue-100 bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <Icon size={30} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {feature.title}
            </h2>

            <p className="mt-2 text-slate-600">{feature.description}</p>
          </div>
        </div>

        <div className="my-8 border-t border-slate-200"></div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center py-12">
            <Loader2 size={45} className="animate-spin text-blue-600" />

            <h3 className="mt-5 text-xl font-semibold text-slate-800">
              Analyzing Resume...
            </h3>

            <p className="mt-2 text-slate-500">
              Please wait while AI processes your request.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h3 className="text-xl font-semibold text-red-600">
              Something went wrong
            </h3>

            <p className="mt-3 text-slate-700">{error}</p>
          </div>
        )}

        {/* ================= Resume Match ================= */}

        {!loading && !error && result && feature.type === "resume-match" && (
          <div className="space-y-8">
            {/* Match Score */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <h3 className="text-xl font-semibold text-blue-700">
                Resume Match Score
              </h3>

              <p className="mt-3 text-5xl font-bold text-slate-900">
                {result.matchScore}%
              </p>
            </div>

            {/* Strengths */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-green-700">
                Strengths
              </h3>

              <div className="space-y-3">
                {result.strengths?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
                  >
                    <CheckCircle2 size={20} className="mt-1 text-green-600" />

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-red-700">
                Missing Skills
              </h3>

              <div className="space-y-3">
                {result.missingSkills?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl bg-red-50 p-4"
                  >
                    <XCircle size={20} className="mt-1 text-red-600" />

                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-800">
                AI Summary
              </h3>

              <p className="mt-4 leading-8 text-slate-700">{result.summary}</p>
            </div>
          </div>
        )}

        {/* ================= Interview Questions ================= */}

        {!loading && !error && result && feature.type === "interview-qus" && (
          <div className="space-y-8">
            {/* Technical Questions */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-blue-700">
                Technical Questions
              </h3>

              <div className="space-y-3">
                {result.technicalQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-blue-50 p-4"
                  >
                    <CircleHelp size={20} className="mt-1 text-blue-600" />

                    <p>{question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Questions */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-purple-700">
                Project Based Questions
              </h3>

              <div className="space-y-3">
                {result.projectQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-purple-50 p-4"
                  >
                    <CircleHelp size={20} className="mt-1 text-purple-600" />

                    <p>{question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem Solving */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-orange-700">
                Problem Solving Questions
              </h3>

              <div className="space-y-3">
                {result.problemSolvingQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-orange-50 p-4"
                  >
                    <CircleHelp size={20} className="mt-1 text-orange-600" />

                    <p>{question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavioral */}
            <div>
              <h3 className="mb-4 text-xl font-semibold text-green-700">
                Behavioral Questions
              </h3>

              <div className="space-y-3">
                {result.behavioralQuestions?.map((question, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-xl bg-green-50 p-4"
                  >
                    <CircleHelp size={20} className="mt-1 text-green-600" />

                    <p>{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= Cover Letter ================= */}

        {!loading && !error && result && feature.type === "cover-letter" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-slate-800">
                AI Generated Cover Letter
              </h3>

              <div className="space-y-6 text-slate-700 leading-8 whitespace-pre-line">
                <p className="font-medium">{result.greeting}</p>

                <p>{result.introduction}</p>

                <p>{result.body}</p>

                <p>{result.closing}</p>

                <p className="font-medium">{result.signature}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIPopup;
