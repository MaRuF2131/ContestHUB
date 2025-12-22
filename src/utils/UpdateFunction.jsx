import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./api/axios";
import toast from "react-hot-toast";

function UpdateFunction() {
    const queryClient = useQueryClient();
    const Mutation = useMutation({
    mutationFn: async ({id,body={},url,query}=info) => {
      const res = await axiosInstance.patch(`/${url}/${id}`, {
        ...body,
      });
      return query ;
    },
    onSuccess: (query) => {
      queryClient.invalidateQueries([query?.url,query?.type,query?.search,query?.status]);
      toast.success("Update Successfully");
    },
   onError:(data)=>{
         toast.error(data?.response?.data?.message); 
        console.log(data);
        
    }
  });
  return Mutation;
}

export default UpdateFunction