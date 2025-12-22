import React from "react";
import {
  Users,
  UserCog,
  UserCheck,
  User,
  LayoutGrid,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import StatCard from "./StatCard";

const AdminStatistics = ({ stats }) => {
  if (!stats) return null;

  const {
    totalUsers,
    totalAdmins,
    totalCreators,
    totalNormalUsers,
    totalContests,
    pendingContests,
    confirmedContests,
    rejectedContests,
  } = stats;

  return (
    <div className="space-y-10">
      {/* USER STATS */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-5">
          👥 User Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard icon={<Users />} label="Total Users" value={totalUsers} />
          <StatCard icon={<UserCog />} label="Admins" value={totalAdmins} />
          <StatCard icon={<UserCheck />} label="Creators" value={totalCreators} />
          <StatCard icon={<User />} label="Users" value={totalNormalUsers} />
        </div>
      </section>

      {/* CONTEST STATS */}
      <section>
        <h2 className="text-xl font-semibold text-zinc-800 dark:text-white mb-5">
          🏆 Contest Statistics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard icon={<LayoutGrid />} label="Total Contests" value={totalContests} />
          <StatCard icon={<Clock />} label="Pending" value={pendingContests} />
          <StatCard icon={<CheckCircle />} label="Confirmed" value={confirmedContests} />
          <StatCard icon={<XCircle />} label="Rejected" value={rejectedContests} />
        </div>
      </section>
    </div>
  );
};

export default AdminStatistics;
