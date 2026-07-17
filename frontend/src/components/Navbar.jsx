import { NavLink } from "react-router-dom";
import Container from "./Container.jsx";
import logo from "../assets/logo.png";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const authLinks = [
  {
    name: "Login",
    path: "/login",
    variant: "text",
  },
  {
    name: "Register",
    path: "/register",
    variant: "primary",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navLinks = user
    ? [
        {
          name: "Jobs",
          path: "/jobs",
        },
        {
          name: "Saved Jobs",
          path: "/saved-jobs",
        },
        {
          name: "Applications",
          path: "/applications",
        },
      ]
    : [
        {
          name: "Jobs",
          path: "/jobs",
        },
      ];
  return (
    <header className="sticky top-0 z-50 border-b border-blue-200/60 bg-linear-to-r from-blue-100/90 via-sky-50/90 to-blue-100/90 backdrop-blur-xl">
      <Container>
        {/* Top Navbar */}
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-3 outline-none focus:outline-none focus-visible:outline-none"
          >
            <img
              src={logo}
              alt="PlaceMate AI Logo"
              className="h-8 w-auto object-contain border-none outline-none"
            />

            <span className="text-3xl font-bold tracking-tight text-slate-900">
              PlaceMate AI
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center rounded-full border border-blue-100 bg-white/70 p-1 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "text-slate-700 hover:bg-blue-100 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 shadow-sm transition hover:border-blue-300 hover:bg-white"
                >
                  <span className="font-medium text-slate-700">
                    {user.name}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <NavLink
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-5 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50"
                    >
                      Profile
                    </NavLink>

                    <div className="border-t border-slate-200" />

                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="block w-full px-5 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              authLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => {
                    if (link.variant === "primary") {
                      return "rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700";
                    }

                    return `rounded-full px-5 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-slate-100 text-blue-600"
                        : "text-slate-700 hover:bg-blue-200 hover:text-blue-600"
                    }`;
                  }}
                >
                  {link.name}
                </NavLink>
              ))
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 hover:bg-slate-100 lg:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-700 hover:bg-blue-50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="my-2 border-t border-slate-200" />

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50"
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                authLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={
                      link.variant === "primary"
                        ? "rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
                        : "rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
