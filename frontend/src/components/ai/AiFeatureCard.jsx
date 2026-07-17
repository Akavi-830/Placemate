import { ArrowRight } from "lucide-react";

function AIFeatureCard({ feature, onClick }) {
  const Icon = feature.icon;

  return (
    <div
      onClick={() => onClick(feature)}
      className="group cursor-pointer rounded-3xl border border-blue-100 bg-linear-to-br from-white via-blue-50 to-indigo-50 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition-all duration-300 group-hover:bg-blue-600">
          <Icon
            size={30}
            className="text-blue-600 transition-all duration-300 group-hover:text-white"
          />
        </div>

        <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
          AI
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-bold text-slate-900">{feature.title}</h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-7 text-slate-600">
        {feature.description}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="text-sm font-medium text-slate-500">AI Powered</span>

        <div className="flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 group-hover:text-blue-700">
          <span>Explore</span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
}

export default AIFeatureCard;
