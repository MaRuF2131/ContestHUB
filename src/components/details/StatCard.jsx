const StatCard = ({ title, value, highlight }) => (
    <div
      className={`p-6 rounded-2xl shadow-xl text-center ${
        highlight
          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
          : "bg-white"
      }`}
    >
      <p className="text-sm uppercase opacity-80">{title}</p>
      <h3 className="text-3xl font-extrabold mt-2">{value}</h3>
    </div>
  );
export default StatCard;  