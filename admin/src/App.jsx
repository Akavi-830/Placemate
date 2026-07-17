import React from "react";
import { Route, Routes } from "react-router-dom";
import Companies from "./pages/Companies.jsx";
import Jobs from "./pages/Jobs.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Applications from "./pages/Applications.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import AddCompany from "./pages/AddCompany.jsx";
import EditCompany from "./pages/EditCompany.jsx";
import AddJob from "./pages/AddJob.jsx";
import EditJob from "./pages/EditJob.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/new" element={<AddCompany />} />
        <Route path="/company/:id" element={<EditCompany />} />
        <Route path="/jobs/new" element={<AddJob />} />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<EditJob />} />

        <Route path="/applications" element={<Applications />} />
      </Route>
    </Routes>
  );
}

export default App;
