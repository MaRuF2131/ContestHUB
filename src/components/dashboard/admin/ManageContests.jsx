import React, { useState } from "react";
import { demoContests } from "../../../../demoData/demoContests";
import toast from "react-hot-toast";

const ManageContests = () => {
  const [contests, setContests] = useState(demoContests);

  const handleContestAction = (id, action) => {
    if (action === "delete") {
      setContests(contests.filter(c => c.id !== id));
      toast.success("Contest deleted!");
    } else {
      setContests(contests.map(c => c.id === id ? { ...c, status: action } : c));
      toast.success(`Contest ${action}!`);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">Manage Contests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Creator</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Status</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map(contest => (
              <tr key={contest.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-2">{contest.name}</td>
                <td className="px-4 py-2">{contest.creator}</td>
                <td className={`px-4 py-2 font-semibold ${
                  contest.status === "Confirmed" ? "text-green-500" :
                  contest.status === "Pending" ? "text-yellow-500" : "text-red-500"
                }`}>{contest.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleContestAction(contest.id, "Confirmed")}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleContestAction(contest.id, "Rejected")}
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleContestAction(contest.id, "delete")}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContests;
