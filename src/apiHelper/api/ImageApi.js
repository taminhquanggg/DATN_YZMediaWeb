import { get_User_Name } from "../../store/actions/sharedActions";
import { useAxios } from "../connection/APIConnection";

export const useImageApi = () => {
  const apiConnection = useAxios();

  return {
    GetImageByPostID: (param) => {

      return apiConnection.httpRequest(
        "POST",
        `api/Image/get-by-posts-id`,
        param
      );
    },

    GetPresignedUrl: () => {
      return apiConnection.httpRequest(
        "POST",
        `api/Image/get-presigned-url`
      );
    },

    UploadPresignedUrl: (url, file) => {
      let prop = {
        file: file
      }

      const basePresignedUrl = "https://upload.imagedelivery.net/"

      return apiConnection.httpRequestCloudflare(
        "POST",
        url.substring(basePresignedUrl.length),
        basePresignedUrl,
        prop,
        null,
        true,
        "multipart/form-data"
      )
    },

    Insert: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        `api/Image`,
        prop
      );
    },

    InsertPostImage: (prop) => {
      return apiConnection.httpRequest(
        "POST",
        `api/PostImage`,
        prop
      );
    },

    AddFile: (prop, p_posts_id) => {
      return apiConnection.httpRequest(
        "POST",
        "api/manager/file-attach/add-file",
        prop,
        { p_posts_id: p_posts_id },
        false,
        "multipart/form-data"
      );
    },

    Delete: (p_id) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/manager/file-attach/delete",
        null,
        {
          p_id: p_id,
          p_Modified_By: get_User_Name(),
        }
      );
    },

    Delete_Multiple: (p_ids) => {
      return apiConnection.httpRequest(
        "DELETE",
        "api/manager/file-attach/delete_multiple",
        null,
        {
          p_ids: p_ids,
          p_Modified_By: get_User_Name(),
        }
      );
    },
  };
};
