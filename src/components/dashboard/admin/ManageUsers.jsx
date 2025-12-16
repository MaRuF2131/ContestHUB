import React, { useState } from "react";
import { demoUsers } from "../../../../demoData/demoUsers";
import toast from "react-hot-toast";

const roles = ["user", "creator", "admin"];

const ManageUsers = () => {
  const [users, setUsers] = useState(demoUsers);

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    toast.success("User role updated!");
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Email</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white"
                  >
                    {roles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
