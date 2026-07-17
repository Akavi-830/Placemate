import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  FileText,
} from "lucide-react";

const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icons: LayoutDashboard,
  },
  {
    name: "Companies",
    path: "/companies",
    icons: Building2,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icons: BriefcaseBusiness,
  },
  {
    name: "Applications",
    path: "/applications",
    icons: FileText,
  },
];

function Sidebar() {
  return (
    <aside className="flex flex-col h-full w-64 border-r border-gray-200">
      {/* Logo */}

      <div className="border-b border-gray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="PlaceMate AI Logo"
            className="h-10 w-10 object-contain shrink-0"
          />

          <div>
            <h1 className="text-2xl font-bold leading-none text-slate-900">
              PlaceMate AI
            </h1>

            <p className="mt-1 text-sm font-medium tracking-wide text-slate-500">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="mt-6 flex flex-col gap-2 px-3">
        {sidebarLinks.map((link) => {
          const Icon = link.icons;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="h-5 w-5" />

              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
