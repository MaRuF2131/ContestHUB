import { Link } from "react-router-dom";
import ContestCard from "../../../ui/ContestCard";
import { useEffect, useState } from "react";
import Pagination from "../../../utils/Pagination";
import TextOrcardLoader from "../../loader/TextOrcardLoader";
import NoDataIndicator from "../../common/NodataIndicator";
import { Flame } from "lucide-react";

function PopularContest() {
  const [contests, setContests] = useState([]);

  const { data, isFetching, status } = Pagination({
    url: "/alluser/get",
    keyValuepair: {
      type: "all",
      search: "",
      status: "populer",
    },
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    if (data) {
      const value =
        data?.pages?.flatMap((page) => page?.data?.data) || [];
      setContests(value);
    }
  }, [data]);

  return (
    <section className="relative py-24 max-w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Background glow */}
      <div className="absolute -top-24 -left-24 w-96 max-w-full h-96 bg-pink-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 max-w-full h-96 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
              <Flame className="w-6 h-6" />
            </span>

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-800 dark:text-white">
                Popular Contests
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Trending contests creators love right now
              </p>
            </div>
          </div>

          <Link
            to="/all-contests"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
            bg-gradient-to-r from-pink-500 to-purple-500
            text-white font-semibold shadow-md
            hover:scale-105 transition"
          >
            Show All
            <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Content */}
        {isFetching && (
          <div className="mt-16">
            <TextOrcardLoader ms="Contest" />
          </div>
        )}

        {!isFetching && contests?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {contests.map((contest, index) => (
              <ContestCard
                key={contest._id}
                contest={contest}
                index={index}
              />
            ))}
          </div>
        )}

        {/* No data */}
        {!isFetching &&
          contests?.length <= 0 &&
          status === "success" && (
            <div className="mt-20">
              <NoDataIndicator message="Contest" />
            </div>
          )}
      </div>
    </section>
  );
}

export default PopularContest;
