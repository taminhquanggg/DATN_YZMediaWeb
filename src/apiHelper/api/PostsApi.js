import { get_User_Name } from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const usePostsApi = () => {
  const apiConnection = useAxios();


  return {
    SearchData: (searchText, offset, pageSize) => {
      let key = searchText.split('|')

      return apiConnection.httpRequest(
        "POST",
        `api/Posts/search`,
        {
          searchText: key[0],
          dateFrom: key[1] ? key[1] : null,
          dateTo: key[2] ? key[2] : null,
          offset: offset,
          pageSize: pageSize
        }
      );
    },

    GetById: (id) => {
      return apiConnection.httpRequest(
        "GET",
        `api/Posts/` + id
      );
    },

    Insert: (prop) => {
      prop.UserI = get_User_Name();

      if (prop.PostLogoImage) {
        prop.PostLogoImage = prop.PostLogoImage.originFileObj
      }

      if (prop.PostCoverImage) {
        prop.PostCoverImage = prop.PostCoverImage.originFileObj
      }

      return apiConnection.httpRequest(
        "POST",
        `api/Posts`,
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },

    Update: (prop) => {
      prop.UserU = get_User_Name();

      return apiConnection.httpRequest(
        "PUT",
        `api/Posts`,
        prop,
        null,
        true,
        "multipart/form-data"
      );
    },
    
    Delete: (p_id) => {
      return apiConnection.httpRequest(
        "DELETE",
        `api/Posts/` + p_id
      );
    },
  };
};
