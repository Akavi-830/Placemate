import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Profile from "../pages/Profile";
import SavedJobs from "../pages/SavedJobs";
import Applications from "../pages/Applications";

import NotFound from "../pages/NotFound";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UpdateProfile from "../pages/UpdateProfile";
import ProtectedRoute from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "saved-jobs",
            element: <SavedJobs />,
          },
          {
            path: "applications",
            element: <Applications />,
          },
          {
            path: "/update-profile",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verifyEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
