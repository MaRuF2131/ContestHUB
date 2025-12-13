
const ContestTabs = ({ activeTab, setActiveTab, tabs}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-5 py-2 rounded-full border font-medium transition
            ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 dark:text-white"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ContestTabs;
