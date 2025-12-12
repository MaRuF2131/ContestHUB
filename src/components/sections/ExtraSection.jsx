import { motion } from "framer-motion";
import { Lightbulb, Trophy, Users } from "lucide-react";

const ExtraSection = () => {
  const features = [
    {
      icon: <Lightbulb size={40} />,
      title: "Boost Your Creativity",
      desc: "Join exciting contests that spark your imagination and grow your skills."
    },
    {
      icon: <Users size={40} />,
      title: "Join a Global Community",
      desc: "Connect with thousands of creators, designers, writers, and thinkers."
    },
    {
      icon: <Trophy size={40} />,
      title: "Win Rewards & Recognition",
      desc: "Earn prizes, badges, and showcase your talent to the world."
    }
  ];

  return (
    <div className="py-20 bg-gray-100 dark:bg-gray-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-10 text-gray-900 dark:text-white"
        >
          Why Choose <span className="text-blue-600">ContestHub?</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 hover:-translate-y-2 transition duration-300 border dark:border-gray-700"
            >
              <div className="text-blue-600 flex justify-center mb-5">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {feat.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
