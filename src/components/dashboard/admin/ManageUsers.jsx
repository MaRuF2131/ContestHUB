import React, { useEffect, useRef, useState } from "react";
import { demoUsers } from "../../../../demoData/demoUsers";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useDebounce from "../../../utils/useDebounce";
import Pagination from "../../../utils/Pagination";
import { Filter, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import { DangerousContentCheck } from "../../../utils/custom-validation/CustomValidation";
import TableLoader from "../../loader/TableLoader";
import FinishIndigator from "../../common/FinishIndicator";
import NoDataIndicator from "../../common/NodataIndicator";
import UpdateFunction from "../../../utils/UpdateFunction";

const roles = ["user", "creator", "admin"];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [total,settotal]=useState(0);
  const {register, watch,reset, formState: { errors }} = useForm({
    mode:"onChange", 
    criteriaMode: "all",
    defaultValues:{
      role:"all",
      search:""
    }
  });
  const M= UpdateFunction();
  const searchTerm = watch("search");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const filterType= watch("role");
  const loadMoreRef = useRef();
  const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isFetching,
      status
     } = Pagination(
  {
    url:"/admin/get/user",  
    keyValuepair: {
    search: searchTerm,
    type: filterType || 'all',
  },page:1,limit:10});

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

 useEffect(()=>{
  console.log("data",data);
  
    if(data){ 
      const value=data?.pages?.flatMap((page) => page?.data?.data) || []; 
      setUsers(value);
      const len=data?.pages.length || 0
      const tl=data?.pages[len-1]?.data?.total || 0
      settotal(parseInt(tl));
    }
  },[data])

   const handleUpdate = async(id,body) => {
     M.mutate({url:'admin/user',body:body,id:id,query:{url:"/admin/get/user",search:searchTerm,type:filterType || 'all',}});
  };



  return (
    <>
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">Manage Users</h2>
       
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
                  onClick={()=>reset({search: ""})}
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


            {/* Type */}
            <motion.div whileHover={{ scale: 1.03 }} className="relative">
              <select
                {...register("role",{ ...DangerousContentCheck })}
                className="appearance-none px-4 py-2 pr-10 rounded-xl
                bg-zinc-100 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700
                text-zinc-800 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="all">All Types</option>
                <option value="user">User</option>
                <option value="creator">Creator</option>
                <option value="admin">Admin</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-500">
                ▼
              </span>
            </motion.div>

            {/* Clear Filters */}
            {(filterType !== "all") && (
              <button
                onClick={() => {
                  reset({role: "all" });
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
        <table className="min-w-full mx-auto table-auto border-collapse border border-zinc-200 dark:border-zinc-700">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-left">
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Name</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Email</th>
              <th className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdate(user._id, {role:e.target.value})}
                    className="px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white"
                  >
                    {roles.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
              {/* Load more / end indicator */}
        <div ref={loadMoreRef} className="w-full text-center mt-8">
              {(isFetching || isFetchingNextPage)  && <TableLoader ms={"users"}></TableLoader>}
        </div>
        {/* no data indicator  */}
        {(!hasNextPage && users?.length <= 0 && !isFetching && !isFetchingNextPage && status==="success") &&(
          <NoDataIndicator message="Users"></NoDataIndicator>
        )}
    </div>
          {!hasNextPage && data?.pages[0]?.data?.data.length > 0 && (
             <FinishIndigator ms={"All User Loaded"}></FinishIndigator>
          )}
    </>
  );
};

export default ManageUsers;
