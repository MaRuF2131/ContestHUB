import React from "react";
import { Calendar, CreditCard } from "lucide-react";

const MyParticipatedContests = ({ contests = [] }) => {
  const sorted = [...contests].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-zinc-800 dark:text-white">
        🎯 My Participated Contests
      </h2>

      <div className="space-y-4">
        {sorted.map((contest) => (
          <div
            key={contest?._id}
            className="flex flex-col md:flex-row md:items-center justify-between
            p-4 rounded-xl border dark:border-zinc-700"
          >
            <div>
              <h3 className="font-semibold text-lg">{contest?.name}</h3>

              <p className="text-sm flex items-center gap-2 text-zinc-500">
                <Calendar className="w-4 h-4" />
                Deadline: {new Date(contest?.deadline).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  contest?.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-600"
                    : contest?.paymentStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <CreditCard className="inline w-4 h-4 mr-1" />
                {contest?.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyParticipatedContests;
