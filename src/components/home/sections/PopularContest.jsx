import { Link } from "react-router-dom";
import contestsData from "../../../../demoData/contestsData.json";
import ContestCard from '../../../ui/ContestCard';

function PopularContest() {   
      const sortedContests = contestsData.sort(
        (a, b) => b.participants - a.participants
      );
    
      return (
        <div className="max-w-7xl mx-auto px-4 mt-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              🔥 Popular Contests
            </h2>
            <Link
              to="/all-contests"
              className="text-blue-600 font-semibold hover:underline"
            >
              Show All →
            </Link>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {sortedContests.slice(0, 6).map((contest, index) => (
               <ContestCard key={contest.id} contest={contest} index={index} />
            ))}
          </div>
        </div>
      );
    
}

export default PopularContest