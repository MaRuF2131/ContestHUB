import { motion } from "framer-motion";
import {  useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hook/UseAuth";


export default function Navbar() {
 const{user,loading,logout}=useAuth();
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);   
return (
<motion.nav
initial={{ y: -30, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.5 }}
className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50"
>
<Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
ContestHub
</Link>


<div className="space-x-6 text-black dark:text-white font-medium">
<Link to="/">Home</Link>
 <Link to="/all-contest">All Contests</Link>
<Link to="/leaderboard">Leaderboard</Link> 
</div>
<div>
{loading ? (
<p className="text-black dark:text-white">Loading...</p>
) : user ? (    
    <div className="relative md:block hidden">
        <img
            src={user.photoURL || 'https://via.placeholder.com/40'}
            alt="User Profile"
            referrerPolicy='no-referrer'
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-2 z-50">
                <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    Dashboard
                </Link>
                <button type="button"
                    onClick={() => logout()}
                    className="w-full text-left block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                   >
                    Logout
                </button>
            </div>
        )}
    </div>
) : (
<Link
to="/login"
className="text-black dark:text-white font-medium"
>   Login</Link>
)}
</div>
</motion.nav>
);
}