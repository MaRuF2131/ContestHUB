import { motion } from "framer-motion";
import { Lightbulb, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Boost Your Creativity",
    desc: "Participate in inspiring contests that sharpen your skills and unlock your creative potential."
  },
  {
    icon: Users,
    title: "Global Community",
    desc: "Connect with designers, developers, and creators from all around the world."
  },
  {
    icon: Trophy,
    title: "Win Rewards & Fame",
    desc: "Earn prizes, recognition, and build a strong public portfolio."
  }
];

const ExtraSection = () => {
  return (
    <section className="relative py-28 overflow-hidden bg-zinc-50 dark:bg-zinc-950">

      {/* Background Gradient Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-16
          bg-gradient-to-r from-pink-500 to-purple-600
          bg-clip-text text-transparent"
        >
          Why Choose ContestHub?
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl p-8
                bg-white/70 dark:bg-zinc-900/70
                backdrop-blur-xl border border-white/20 dark:border-zinc-800
                shadow-xl hover:shadow-2xl transition-all"
              >
                {/* Icon Bubble */}
                <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center
                rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600
                text-white shadow-lg group-hover:scale-110 transition">
                  <Icon size={30} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">
                  {feat.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
