import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ContestCard({ contest, index }) {
  return (
        <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-56 object-cover hover:scale-105 transition duration-300"
                />
    
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {contest.name}
                  </h3>
    
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {contest.shortDesc.slice(0, 70)}...
                  </p>
    
                  <p className="text-sm font-semibold text-blue-600 mb-3">
                    👥 {contest.participants} participants
                  </p>
    
                  <Link
                    to={`/contest/${contest.id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Details
                  </Link>
                </div>
              </motion.div>
  )
}

export default ContestCard