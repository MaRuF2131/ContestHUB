import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import {
  Trophy,
  Crown,
  Search,
  X,
  BarChart2,
  User,
} from "lucide-react";

const Leaderboard = ({ users = [] }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("global"); // global | monthly

  // Filter + Sort
  const sortedUsers = useMemo(() => {
    return users
      .filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        mode === "global" ? b.wins - a.wins : b.monthlyWins - a.monthlyWins
      );
  }, [users, search, mode]);

  const maxWins =
    sortedUsers.length > 0
      ? Math.max(...sortedUsers.map((u) => u.wins))
      : 1;

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg relative">
      {/* Confetti for #1 */}
      {sortedUsers[0]?.wins > 0 && <Confetti recycle={false} numberOfPieces={250} />}

      {/* Header */}
      <h2 className="text-3xl font-bold text-center mb-6
        bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        🏆 Leaderboard
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl
            bg-zinc-100 dark:bg-zinc-800
            border border-zinc-200 dark:border-zinc-700
            focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2">
          {["global", "monthly"].map((t) => (
            <button
              key={t}
              onClick={() => setMode(t)}
              className={`px-4 py-2 rounded-full font-semibold transition
                ${
                  mode === t
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700"
                }`}
            >
              🌍 {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {sortedUsers.map((user, index) => {
          const isTop = index === 0;
          const winPercent = (user.wins / maxWins) * 100;

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ delay: index * 0.07 }}
              onClick={() => setSelectedUser(user)}
              className={`cursor-pointer p-4 rounded-xl border
                ${
                  isTop
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20">
                    {index === 0 ? <Crown className="text-yellow-300" /> : index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm opacity-80">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-semibold">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  {mode === "global" ? user.wins : user.monthlyWins}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${winPercent}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-yellow-300"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Winner Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">🥇 Winner Profile</h3>
                <X
                  className="cursor-pointer"
                  onClick={() => setSelectedUser(null)}
                />
              </div>

              <div className="space-y-3">
                <p><User className="inline mr-2" /> {selectedUser.name}</p>
                <p>📧 {selectedUser.email}</p>
                <p>🏆 Total Wins: {selectedUser.wins}</p>
                <p>📊 Monthly Wins: {selectedUser.monthlyWins}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;
