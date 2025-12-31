import { Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative">
      {/* Gradient Glow */}
      <div className="absolute inset-x-0 -top-24 h-24 
        bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-zinc-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r 
              from-pink-500 to-purple-600 bg-clip-text text-transparent">
              ContestHub
            </h2>
            <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
              A global platform to participate, compete, and win amazing prizes
              through creative and technical contests.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-zinc-400">
              {["Home", "All Contests", "Leaderboard", "Dashboard"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-pink-500 transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-3 rounded-full
                bg-white/10 hover:bg-gradient-to-r
                hover:from-pink-500 hover:to-purple-600
                transition"
              >
                <Facebook size={22} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-3 rounded-full
                bg-white/10 hover:bg-gradient-to-r
                hover:from-pink-500 hover:to-purple-600
                transition"
              >
                <Linkedin size={22} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800 py-4 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} ContestHub — All Rights Reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
