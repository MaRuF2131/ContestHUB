import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ContestCard({ contest, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden
      bg-white dark:bg-zinc-900
      shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={contest?.imageUrl}
          alt={contest?.name}
          className="w-full h-56 object-cover
          group-hover:scale-110 transition duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Prize Badge */}
        <div className="absolute top-4 left-4 
          bg-gradient-to-r from-yellow-400 to-orange-500
          text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          🏆 ${contest?.prizeMoney}
        </div>

        {/* Participants */}
        <div className="absolute top-4 right-4 
          bg-white/90 dark:bg-zinc-800/90 backdrop-blur
          text-xs font-semibold px-3 py-1 rounded-full
          text-zinc-800 dark:text-white">
          👥 {contest?.participants || 0}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
          {contest?.name}
        </h3>

        <p className="text-sm mb-4 text-zinc-600 dark:text-zinc-400">
          {contest?.description?.slice(0, 80)}...
        </p>

        {/* Info Row */}
        <div className="flex items-center justify-between text-sm mb-4">
          <span className="text-green-600 font-semibold">
            💵 Entry: ${contest?.price}
          </span>

          <span className="text-red-500 font-medium">
            ⏳ {new Date(contest?.deadline).toLocaleDateString()}
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/contest/${contest._id}`}
          className="block w-full text-center py-2.5 rounded-xl
          font-semibold text-white
          bg-gradient-to-r from-pink-500 to-purple-600
          hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
        >
          View Details →
        </Link>
      </div>
    </motion.div>
  );
}

export default ContestCard;
