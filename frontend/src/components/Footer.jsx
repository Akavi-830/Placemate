import { NavLink } from "react-router-dom";
import Container from "./Container.jsx";
import logo from "../assets/logo.png";
import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" border-t border-blue-100/40 bg-linear-to-br from-blue-50/80 via-sky-50/70 to-blue-100/80backdrop-blur-xl">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="PlaceMate AI"
                className="h-10 w-10 object-contain"
              />

              <h2 className="text-2xl font-bold text-slate-900">
                PlaceMate AI
              </h2>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              Helping job seekers discover better opportunities with AI-powered
              resume analysis, job matching and interview preparation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <NavLink
                  to="/"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/jobs"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Jobs
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className="text-slate-600 transition hover:text-blue-600"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>

          {/* AI Features */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              AI Features
            </h3>

            <ul className="mt-5 space-y-3 text-slate-600">
              <li>Resume Analysis</li>
              <li>Job Matching</li>
              <li>Interview Questions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Contact</h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600" />
                <span className="text-slate-600">
                  <a
                    href="mailto:33anzd@gmail.com"
                    className="text-slate-600 transition hover:text-blue-600"
                  >
                    33anzd@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-600" />
                <span className="text-slate-600">India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 py-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} PlaceMate AI. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
