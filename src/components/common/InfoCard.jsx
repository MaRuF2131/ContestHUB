const Info = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 rounded-lg border bg-white dark:bg-zinc-950">
    <div className="text-indigo-600">{icon}</div>
    <div>
      <p className="text-xs text-zinc-900 dark:text-white">{label}</p>
      <p className="font-semibold text-zinc-700 dark:text-white">{value}</p>
    </div>
  </div>
);
export default Info;