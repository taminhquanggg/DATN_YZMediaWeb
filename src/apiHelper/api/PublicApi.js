import { useAxios } from "../connection/APIConnection";

export const usePublicApi = () => {
  const apiConnection = useAxios();

  return {
    GetAllPosts: () => {
      return apiConnection.httpRequest(
        "GET",
        `api/Public/get-all-posts`
      );
    },
    
  };


};
