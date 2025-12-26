import React from "react";
import { Trophy } from "lucide-react";

const MyWinningContests = ({ wins = [] }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">
        🏆 My Winning Contests
      </h2>

      {wins.length === 0 ? (
        <p className="text-zinc-500">No wins yet. Keep participating! 💪</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wins.map((contest) => (
            <div
              key={contest.id}
              className="p-5 rounded-2xl
              bg-gradient-to-r from-pink-500 to-purple-500
              text-white shadow-lg"
            >
              <Trophy className="w-8 h-8 mb-3" />
              <h3 className="text-lg font-semibold">{contest.name}</h3>
              <p className="text-sm opacity-90 mt-1">
                Prize Won
              </p>
              <p className="text-2xl font-bold mt-2">
                ${contest.prizeMoney}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWinningContests;
