import React from "react";

const StatCard = ({ icon, label, value }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5
      bg-gradient-to-r from-pink-500 to-purple-500
      text-white shadow-lg hover:scale-[1.02] transition"
    >
      {/* glow */}
      <div className="absolute inset-0 bg-white/10 blur-xl" />

      <div className="relative flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white/20">
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>

        <div>
          <p className="text-sm opacity-90">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};
export default StatCard;