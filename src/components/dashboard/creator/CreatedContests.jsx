import React, { useEffect, useRef, useState } from "react";
import { Pencil, Trash2, Eye, Filter, X, Search } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Pagination from "../../../utils/Pagination";
import useDebounce from "../../../utils/useDebounce";
import { useForm } from "react-hook-form";
import { DangerousContentCheck }from "../../../utils/custom-validation/CustomValidation"
import NoDataIndicator from "../../common/NodataIndicator";
import TableLoader from "../../loader/TableLoader";
import FinishIndicator from "../../common/FinishIndicator";
import DeleteFunction from "../../../utils/DeleteFunction";
import EditContest from "./EditContest";
import ContestDetailsView from "../../common/ContestDetailsView";

const MyCreatedContests = () => {
  const {register, watch,reset, formState: { errors }} = useForm({
    mode:"onChange", 
    criteriaMode: "all",
    defaultValues:{
      status:"all",
      type:"all",
      search:""
    }
  });
  const D=DeleteFunction();
  const [contests, setContests] = useState([]);
  const [edit,setedit]=useState(null)
  const [details,setdetails]=useState(null)
  const [total,settotal]=useState(0)
  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filterStatus= watch("status");
  const filterType= watch("type");
  const loadMoreRef = useRef();

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isFetching,
      status
     } = Pagination({
      url:"/creator/get",
      keyValuepair:{
        type:filterType || "all",
        search:searchTerm || '',
        status:filterStatus || "all"
        },
        page:1,limit:10
      });

    const handleDelete = (id) => {
       D.mutate({url:'creator',id:id,query:{url:"/creator/get",search:searchTerm || '',type:filterType || 'all',status:filterStatus || "all"}});
  };
 
 useEffect(()=>{
  console.log("data",data);
    if(data){ 
      const value=data?.pages?.flatMap((page) => page?.data?.data) || []; 
      setContests(value);
      const len=data?.pages.length || 0
      const tl=data?.pages[len-1]?.data?.total || 0
      settotal(parseInt(tl));
    }
  },[data])

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
    <>
    <div className=" relative  p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">
        My Created Contests
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
                📊 {total} Results
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
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Rejected</option>
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



      <div className="overflow-x-auto">
        <table className="min-w-full dark:text-white text-black table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Type</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Participants</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Prize ($)</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Status</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => (
              <tr key={contest._id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-2">{contest.name}</td>
                <td className="px-4 py-2">{contest.type}</td>
                <td className="px-4 py-2">{contest.participants}</td>
                <td className="px-4 py-2">{contest.prizeMoney}</td>
                <td className={`px-4 py-2 font-semibold ${
                  contest.status === "Confirmed"
                    ? "text-green-500"
                    : contest.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}>{contest.status}</td>
                <td className="px-4 py-2 flex gap-2">
                  {contest.status === "Pending" && (
                    <>
                      <button 
                         onClick={()=>setedit(contest)}
                         className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(contest._id)}
                        className="p-1 rounded bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button onClick={()=>setdetails(contest)} className="p-1 rounded bg-purple-500 text-white hover:bg-purple-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* details section */}
       {details &&(
          <div className="absolute top-0 -left-2 -right-2 bg-white dark:bg-zinc-900">
              <X onClick={(e)=>{e.stopPropagation();setdetails(null)}} className="w-6 h-6 float-right cursor-pointer dark:text-white text-black hover:text-pink-500" />
              <ContestDetailsView contest={details} ></ContestDetailsView>
          </div>
          )}

          {/* edit section */}
         {edit &&(
          <div className="absolute top-0 -left-2 -right-2 bg-white dark:bg-zinc-900">
             <EditContest contest={edit} onClose={()=>setedit(null)}></EditContest>
          </div>
         )}
              {/* Load more / end indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-8">
              {(isFetching || isFetchingNextPage)  && <TableLoader ms={"Contest"}></TableLoader>}
        </div>
        {/* no data indicator  */}
        {(!hasNextPage && contests?.length <= 0 && !isFetching && !isFetchingNextPage && status==="success") &&(
          <NoDataIndicator message="Contest"></NoDataIndicator>
        )}
    </div>
          {!hasNextPage && data?.pages[0]?.data?.data.length > 0 && (
             <FinishIndicator ms={"All Contest Loaded"}></FinishIndicator>
          )}
    </>
  );
};

export default MyCreatedContests;
