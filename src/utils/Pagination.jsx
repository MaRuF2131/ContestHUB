import { useInfiniteQuery} from '@tanstack/react-query';
import axiosInstance from './api/axios';

const fetchData=async (url,key,value,pageParam,limit)=>{
   if(!url || !key || !value){  
    return null;
   }
   const params = new URLSearchParams({
    page: pageParam || 1,
    limit: limit || 10,
   });
    params.set(key, value);
    const newUrl = params.toString();
    try{
      const response = await axiosInstance.get(`${url}?${newUrl}`);
      if(response.status !== 200){
        throw new Error("Failed to fetch paginated data");
      }
        return {
        data: response.data,
        nextPage:
          response.pagination.page < response.pagination.totalPages
            ? pageParam + 1
            : undefined,
      };
    }catch(error){
      throw new Error("Error fetching paginated data");
    }
}

async function Pagination(url,key,value,page=1,limit=10) {

    const{
        data,
        isError,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch 
    }=useInfiniteQuery({
     queryKey: [key, value],
     queryFn:({pageParam=page})=>fetchData(url,key,value,pageParam,limit),
     getNextPageParam: (lastPage) => lastPage.nextPage,
     staleTime: 5 * 60 * 1000, // 5 minutes
     cacheTime: 5 * 60 * 1000, // 5 minutes
     retry:2,
     retryDelay: 1000,
     refetchOnReconnect: true,
     refetchOnWindowFocus: false,
    })

  return (
    {
      data,
      isError,
      isFetching,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      status,
      refetch
    }
  )
}

export default Pagination