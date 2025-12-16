import React, { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { demoContests } from "../../../../demoData/demoContests";

const MyCreatedContests = () => {
  const [contests, setContests] = useState(demoContests);

  const handleDelete = (id) => {
    setContests(contests.filter((c) => c.id !== id));
    toast.success("Contest deleted successfully");
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        My Created Contests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Type</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Participants</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Prize ($)</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Status</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-2">{contest.name}</td>
                <td className="px-4 py-2">{contest.type}</td>
                <td className="px-4 py-2">{contest.participants}</td>
                <td className="px-4 py-2">{contest.prizeMoney}</td>
                <td className={`px-4 py-2 font-semibold ${
                  contest.status === "Confirmed"
                    ? "text-green-500"
                    : contest.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}>{contest.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  {contest.status === "Pending" && (
                    <>
                      <button className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contest.id)}
                        className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button className="p-1 rounded bg-purple-500 text-white hover:bg-purple-600">
                    <Eye className="w-4 h-4" />
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

export default MyCreatedContests;
