const CreatorCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl border
    bg-zinc-100 dark:bg-zinc-900">
    <div className="text-pink-500">{icon}</div>
    <div>
      <p className="text-xs text-zinc-900 dark:text-white">{label}</p>
      <p className="font-medium text-zinc-700 dark:text-white">{value}</p>
    </div>
  </div>
);
export default CreatorCard;