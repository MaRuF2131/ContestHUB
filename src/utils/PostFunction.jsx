import axiosInstance from "./api/axios";

export const PostFunction = async (url, data) => {
 try { 
    const newData= new FormData();
    Object.entries(data).forEach(([key,value]) => {
      if(key==="image"){
        newData.append(key,value[0]);
        return;
      }
      newData.append(key,value);
    });  
  const response = await axiosInstance.post(url, newData);
  if (!response.ok) {
    throw new Error("Failed to post data");
  }
  return response.data;
} catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};