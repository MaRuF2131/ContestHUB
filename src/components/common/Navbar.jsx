import { motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hook/UseAuth";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `relative font-medium transition
     ${
       isActive
         ? "text-purple-600 dark:text-purple-400"
         : "text-zinc-700 dark:text-zinc-300 hover:text-purple-500"
     }
     after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-full after:scale-x-0
     after:bg-gradient-to-r after:from-pink-500 after:to-purple-500
     after:origin-left after:transition-transform
     ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}
    `;

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50
      backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80
      border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold bg-gradient-to-r
          from-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          ContestHub
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/all-contest" className={navLinkClass}>
            Contests
          </NavLink>
          <NavLink to="/leaderboard" className={navLinkClass}>
            Leaderboard
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {loading ? (
            <span className="text-sm text-zinc-500">Loading...</span>
          ) : user ? (
            <div className="relative">
              <motion.img
                whileTap={{ scale: 0.9 }}
                src={user.photoURL || "https://i.pravatar.cc/40"}
                alt="profile"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full ring-2 ring-purple-500/40
                cursor-pointer object-cover"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 mt-3 w-48 rounded-xl
                  bg-white dark:bg-zinc-800 shadow-xl
                  border border-zinc-200 dark:border-zinc-700 overflow-hidden"
                >
                  <div
                    className="block px-4 py-2 text-sm
                    text-zinc-700 dark:text-zinc-200
                    hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  >
                    {user?.displayName}
                  </div>
                  <Link
                    to="/dashboard"
                    className="block cursor-pointer px-4 py-2 text-sm
                    text-zinc-700 dark:text-zinc-200
                    hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full cursor-pointer text-left px-4 py-2 text-sm
                    text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full font-semibold text-white
              bg-gradient-to-r from-pink-500 to-purple-600
              hover:from-pink-600 hover:to-purple-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
