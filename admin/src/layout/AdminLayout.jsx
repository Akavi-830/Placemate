import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

function AdminLayout() {
  return (
    <main className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <section className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default AdminLayout;
