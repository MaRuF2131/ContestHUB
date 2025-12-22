import AdminStatistics from "../admin/AdminStatistics"
const stats = {
  totalUsers: 120,
  totalAdmins: 3,
  totalCreators: 25,
  totalNormalUsers: 92,

  totalContests: 40,
  pendingContests: 10,
  confirmedContests: 25,
  rejectedContests: 5,
};

function DashboardHome() {
  return (
    <AdminStatistics stats={stats} />

  )
}

export default DashboardHome