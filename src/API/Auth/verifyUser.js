import { asyncFunc } from "../common/asyncFunc";
import { setHeaders } from "../common/setHeader";
import { apiEndPoints } from "../common/endpoints";
const url = import.meta.env.VITE__APP_API;
export const verifyUser = async () => {
  const config = {
    method: "get",
    url: url + apiEndPoints.USER.verifyUser,
    headers: setHeaders("application/json", true),
  };
  return await asyncFunc(config);
};
