import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
    </div>
  );
};

export default Spinner;
