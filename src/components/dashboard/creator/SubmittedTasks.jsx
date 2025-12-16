import React, { useState } from "react";
import { demoContests } from "../../../../demoData/demoContests";
import { UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import { demoSubmissions } from "../../../../demoData/demoSubmissions";

const SubmittedTasks = () => {
  const [submissions, setSubmissions] = useState(demoSubmissions);
  const [winnerId, setWinnerId] = useState(null);

  const handleDeclareWinner = (id) => {
    setWinnerId(id);
    const winner = submissions.find((s) => s.id === id);
    toast.success(`${winner.participantName} declared as winner 🏆`);
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        Submitted Tasks
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Contest</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Participant Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Email</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Submission</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => {
              const contest = demoContests.find((c) => c.id === sub.contestId);
              return (
                <tr key={sub.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  <td className="px-4 py-2">{contest?.name}</td>
                  <td className="px-4 py-2">{sub.participantName}</td>
                  <td className="px-4 py-2">{sub.participantEmail}</td>
                  <td className="px-4 py-2">
                    <a
                      href={sub.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeclareWinner(sub.id)}
                      disabled={winnerId === sub.id}
                      className={`px-3 py-1 rounded ${
                        winnerId === sub.id
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-purple-500 hover:bg-purple-600 text-white"
                      }`}
                    >
                      <UserCheck className="w-4 h-4 inline mr-1" />
                      {winnerId === sub.id ? "Winner" : "Declare Winner"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedTasks;
