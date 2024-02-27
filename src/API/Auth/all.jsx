import { asyncFunc } from "../common/asyncFunc";
import { apiEndPoints } from "../common/endpoints";
import { setHeaders } from "../common/setHeader";

const url = import.meta.env.VITE__APP_API;

export const GetAllUsers = () => {
  const config = {
    method: "get",
    url: url + apiEndPoints.USER.pending,
    headers: setHeaders("application/json", true),
  };

  return asyncFunc(config);
};
