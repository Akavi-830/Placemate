import { useLocation } from "react-router-dom";
import { UserCircle2, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

function Topbar() {
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";

    if (pathname.startsWith("/companies")) {
      if (pathname === "/companies") return "Companies";
      if (pathname === "/companies/new") return "Add Company";
    }
    if (pathname.startsWith("/company/")) {
      return "Edit Company";
    }
    if (pathname.startsWith("/jobs")) {
      if (pathname === "/jobs") return "Jobs";
      if (pathname === "/jobs/new") return "Add Job";
      return "Edit Job";
    }

    if (pathname === "/applications") {
      return "Applications";
    }

    return "Admin Panel";
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <UserCircle2 className="h-10 w-10 text-gray-600" />

          <div>
            <p className="font-semibold text-gray-800">Admin</p>

            <p className="text-sm text-gray-500">Administrator</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default Topbar;
