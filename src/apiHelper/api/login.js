import { useAxios } from "../connection/APIConnection";

export const useLoginApi = () => {
  const apiConnection = useAxios();

  return {
    Login: (prop) => {
      return apiConnection.httpRequestNonNotify("POST", "api/auth", prop, null, true);
    },
    RefreshToken: (prop) => {
      return apiConnection.httpRequestNonNotify("POST", "api/auth", prop, null, false);
    },
    Checkalive: (prop) => {
      return apiConnection.httpRequestNonNotify("GET", "api/checkalive", null, null, false);
    },
    Logout: (prop) => {
      return apiConnection.httpRequest("POST", "api/logout", null, {Refresh_Token : prop}, true);
    },
  };
};
