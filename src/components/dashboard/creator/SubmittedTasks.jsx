import React, { useEffect, useRef, useState } from "react";
import { demoContests } from "../../../../demoData/demoContests";
import { UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { DangerousContentCheck } from "../../../utils/custom-validation/CustomValidation";
import useDebounce from "../../../utils/useDebounce";
import { demoSubmissions } from "../../../../demoData/demoSubmissions";

const SubmittedTasks = () => {
  const {register, watch,reset, formState: { errors }} = useForm({
      mode:"onChange", 
      criteriaMode: "all",
      defaultValues:{
        status:"all",
        type:"all",
        search:""
      }
    });

    const [submissions, setSubmissions] = useState(demoSubmissions);
    const [winnerId, setWinnerId] = useState(null);
    const searchTerm = watch("search");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const filterStatus= watch("status");
    const filterType= watch("type");
    const loadMoreRef = useRef();
    const PaginationRef=useRef({});

  const handleDeclareWinner = (id) => {
    setWinnerId(id);
    const winner = submissions.find((s) => s.id === id);
    toast.success(`${winner.participantName} declared as winner 🏆`);
  };
  
        const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
       } = PaginationRef.current || {};
  
    const getData=async(keyValuepair={},search)=>{
        PaginationRef.current = await Pagination({url:"/api/contests",keyValuepair:keyValuepair,search:search,page:1,limit:10});
    }
  
      const handleDelete = (id) => {
      setContests(contests.filter((c) => c.id !== id));
      toast.success("Contest deleted successfully");
    };
  
    useEffect(() => {
      if( errors?.search?.message || errors?.status?.message || errors?.type?.message ){
         reset({ search: "", status: "all", type: "all" });
         return;
      }
       getData({"status":filterStatus, "type":filterType, "search":searchTerm}); 
    }, [searchTerm, filterStatus, filterType]); 
  
    useEffect(() => {
      if (!loadMoreRef.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { root: null, rootMargin: '0px', threshold: 0.1 }
      );
      observer.observe(loadMoreRef.current);
      return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        Submitted Tasks
      </h2>

        <div className="flex flex-col gap-5 mb-8">

          {/* Top Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

            {/* Search Box */}
            <motion.div
              initial={{ scale: 1 }}
              whileFocusWithin={{
                scale: 1.03,
                boxShadow: "0 0 0 3px rgba(236,72,153,0.35)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-full lg:w-[45%]"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />

              <input
                type="text"
                disabled={errors?.search?.message}
                {...register("search", {...DangerousContentCheck})}
                placeholder="Search contests by name or type..."
                className="w-full pl-12 pr-12 py-3 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                focus:outline-none
                text-zinc-800 dark:text-white
                placeholder:text-zinc-400"
              />

              {/* Clear Search */}
              {searchTerm && (
                <button
                  onClick={()=>reset({ search: "" })}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                  text-zinc-400 hover:text-pink-500 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </motion.div>

            {/* Right Info */}
            <div className="flex items-center gap-4 flex-wrap">

              {/* Typing Indicator */}
              {((searchTerm !== debouncedSearchTerm) || errors?.search?.message) && (
                <span className="text-sm font-medium text-pink-500 animate-pulse">
                  {errors?.search?.message ? errors.search.message : "Typing..."}
                </span>
              )}

              {/* Result Badge */}
              <div className="px-4 py-2 rounded-full
                bg-gradient-to-r from-pink-500 to-purple-500
                text-white text-sm font-semibold shadow-md">
                📊 {submissions.length} Results
              </div>

            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-4">

            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300 font-medium">
              <Filter className="w-5 h-5 text-pink-500" />
              Filters
            </div>

            {/* Status */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative">
              <select
                {...register("status",{ ...DangerousContentCheck })}
                className="appearance-none px-4 py-2 pr-10 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                text-zinc-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                <option value="all">All Status</option>
                <option value="Pending">Declared</option>
                <option value="Confirmed">Not Declared</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-500">
                ▼
              </span>
            </motion.div>

            {/* Type */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative">
              <select
                {...register("type",{ ...DangerousContentCheck })}
                className="appearance-none px-4 py-2 pr-10 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                text-zinc-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">All Types</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
                ▼
              </span>
            </motion.div>

            {/* Clear Filters */}
            {(filterStatus !== "all" || filterType !== "all") && (
              <button
                onClick={() => {
                  reset({ status: "all", type: "all" });
                }}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full
                bg-pink-100 dark:bg-pink-500/20
                text-pink-600 dark:text-pink-300
                text-sm font-semibold hover:scale-105 transition"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

      <div className="overflow-x-auto text-black dark:text-white">
        <table className="min-w-full table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Contest</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Participant Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Email</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Submission</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => {
              const contest = demoContests.find((c) => c.id === sub.contestId);
              return (
                <tr key={sub.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  <td className="px-4 py-2">{contest?.name}</td>
                  <td className="px-4 py-2">{sub.participantName}</td>
                  <td className="px-4 py-2">{sub.participantEmail}</td>
                  <td className="px-4 py-2">
                    <a
                      href={sub.submissionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeclareWinner(sub.id)}
                      disabled={winnerId === sub.id}
                      className={`px-3 py-1 rounded ${
                        winnerId === sub.id
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-purple-500 hover:bg-purple-600 text-white"
                      }`}
                    >
                      <UserCheck className="w-4 h-4 inline mr-1" />
                      {winnerId === sub.id ? "Winner" : "Declare Winner"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

              {/* Load more / end indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-8">
          {isFetchingNextPage && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Loading more ...
              </span>
            </div>
          )}
          {!hasNextPage && data?.pages[0]?.data?.length > 0 && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg">
              <FaInfoCircle />
              <span className="font-medium">
                All loaded successfully
              </span>
            </div>
          )}
        </div>
    </div>
  );
};

export default SubmittedTasks;
