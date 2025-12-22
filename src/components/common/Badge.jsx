const Badge = ({ icon, text }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm
    bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-white">
    {icon}
    {text}
  </span>
);
export default Badge;