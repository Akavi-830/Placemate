import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-200 via-indigo-100 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-slate-200 p-8 shadow-xl border border-slate-200">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
