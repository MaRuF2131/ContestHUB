import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/common/Navbar";
import Sidebar from "../components/dashboard/common/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main
          className="
            flex-1 overflow-y-auto
            px-4 md:px-6 pt-6 pb-24
            bg-zinc-50 dark:bg-zinc-900
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
