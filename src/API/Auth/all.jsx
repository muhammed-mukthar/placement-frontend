import { asyncFunc } from "../common/asyncFunc";
import { apiEndPoints } from "../common/endpoints";
const url = import.meta.env.VITE__APP_API;

export const GetAllUsers = async (data) => {
  //setting up config for login

  const config = {
    method: "get",
    url: url + apiEndPoints.USER.list,
    headers: setHeaders("application/json", true),
    data,
  };

  return await asyncFunc(config);
};
