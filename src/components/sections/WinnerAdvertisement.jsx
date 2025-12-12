import { motion } from "framer-motion";
import winners from "../../../demoData/winners.json";

const WinnerAdvertisement = () => {
  return (
    <div className="mt-28 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center text-white">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
        >
          🌟 Celebrate Our Champions!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg opacity-90 mb-12"
        >
          Every contest brings new talent. Meet the latest winners who shined the brightest!
        </motion.p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-white/20 backdrop-blur-md px-8 py-5 rounded-xl"
          >
            <h3 className="text-3xl font-bold">350+</h3>
            <p>Total Winners</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-white/20 backdrop-blur-md px-8 py-5 rounded-xl"
          >
            <h3 className="text-3xl font-bold">$25k+</h3>
            <p>Total Prize Money</p>
          </motion.div>
        </div>

        {/* Winner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {winners.map((winner, idx) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 shadow-xl"
            >
              <img
                src={winner.image}
                alt={winner.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white mb-4"
              />

              <h3 className="text-2xl font-semibold mb-1">{winner.name}</h3>
              <p className="opacity-90 mb-2">{winner.contest}</p>

              <p className="text-yellow-300 text-xl font-bold">
                🏆 {winner.prize}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WinnerAdvertisement;
