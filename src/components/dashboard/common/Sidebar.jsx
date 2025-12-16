import React from "react";
import useAuth from "../../../hook/UseAuth";
import { NavLink, useNavigate } from "react-router-dom";
import TextOrCardLoader from "../../loader/TextOrcardLoader";
import {
  Home,
  LayoutDashboard,
  User,
  Trophy,
  ListChecks,
  Users,
  Gavel,
  PlusCircle,
  FolderKanban,
  FileText,
  Pencil,
  LogOut
} from "lucide-react";

/*  USER  */
export const userOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Winning Contests",
    path: "/dashboard/winning",
    icon: Trophy,
  },
  {
    name: "Participated Contests",
    path: "/dashboard/participated",
    icon: ListChecks,
  },
];

/*  ADMIN  */
export const adminOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Statistics",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Users",
    path: "/dashboard/users",
    icon: Users,
  },
  {
    name: "Manage Contests",
    path: "/dashboard/contests",
    icon: Gavel,
  },
];

/* CREATOR */
export const creatorOptions = [
  {
    name: "Home",
    path: "/",
    icon: Home,
  },
  {
    name: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Contest",
    path: "/dashboard/add-contest",
    icon: PlusCircle,
  },
  {
    name: "Created Contests",
    path: "/dashboard/created-contests",
    icon: FolderKanban,
  },
  {
    name: "Submitted Tasks",
    path: "/dashboard/submitted-tasks",
    icon: FileText,
  },
  {
    name: "Edit Contest",
    path: "/dashboard/edit-contest",
    icon: Pencil,
  },
];


const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside
      className="
      lg:h-screen w-[260px] shrink-0
      bg-white dark:bg-zinc-950
      border-r border-zinc-200 dark:border-zinc-800
      px-5 py-6 flex flex-col justify-between
      fixed lg:sticky top-0 z-40
    "
    >
      {/* User Info */}
      <div>
        <div className="flex flex-col items-start gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <img
            src={user?.photoURL || "https://via.placeholder.com/80"}
            alt="User"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
          />

          <p className="text-sm text-zinc-500 dark:text-zinc-400 break-all">
            {user?.email}
          </p>
        </div>

        {!user?.role && <TextOrCardLoader />}

        {/* Navigation */}
        <ul className="mt-6 space-y-1">
          {(user?.role === "user" ? userOptions
            : user?.role === "admin" ? adminOptions
            : creatorOptions
          )?.map((item, index) => (
            <li key={index}>
              <NavLink
                end
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }
                `
                }
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-3 px-4 py-2 mt-6 rounded-lg
          text-sm font-medium text-zinc-600 dark:text-zinc-300
          hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500
          transition
        "
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
