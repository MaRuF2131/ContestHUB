import { useInfiniteQuery} from '@tanstack/react-query';
import axiosInstance from './api/axios';
import useAuth from '../hook/UseAuth';

const fetchData=async (url,keyValuepair,pageParam,limit)=>{
    if(!url || !keyValuepair){  
      return null;
    }
    const params = new URLSearchParams({
      page: pageParam || 1,
      limit: limit || 10,
    });
    for(const [key, value] of Object.entries(keyValuepair)){
        params.append(key, value);
    }
    const newUrl = params.toString();
    try{
      const response = await axiosInstance.get(`${url}?${newUrl}`);
      console.log("res",response);
          
      if(response.status == 401){
        console.log("errr",error);
        throw new Error("Failed to fetch paginated data");
      }
        return {
        data:{data:response?.data?.data || [],total:response?.data?.pagination?.total},
        nextPage:
          response?.data?.pagination?.page < response?.data?.pagination?.totalPages
            ? pageParam + 1
            : undefined,
      };
    }catch(error){
      throw new Error("Error fetching paginated data");
    }
}

 function Pagination({url,keyValuepair={},page=1,limit=10}=info) {
  const{user}=useAuth();
    return useInfiniteQuery({
     queryKey: [url,keyValuepair?.type,keyValuepair?.search,keyValuepair?.status],
     queryFn:({pageParam=page})=>fetchData(url,keyValuepair,pageParam,limit),
     getNextPageParam: (lastPage) => lastPage.nextPage,
     enabled:!!user?.uid,
     staleTime: 5 * 60 * 1000, // 5 minutes
     cacheTime: 5 * 60 * 1000, // 5 minutes
     retry:2,
     retryDelay: 1000,
     refetchOnReconnect: true,
     refetchOnWindowFocus: false,
    })
}

export default Pagination