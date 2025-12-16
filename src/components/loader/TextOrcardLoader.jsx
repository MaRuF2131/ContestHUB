const SkeletonCard = () => (
  <div className="animate-pulse p-4 rounded-md shadow-md bg-white dark:bg-gray-800">
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
    <div className="h-32 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
  </div>
);
export default SkeletonCard;
