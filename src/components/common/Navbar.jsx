import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Navbar() {
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
</motion.nav>
);
}