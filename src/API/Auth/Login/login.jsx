import { asyncFunc } from "../../common/asyncFunc";
import { apiEndPoints } from "../../common/endpoints";
const url = import.meta.env.VITE__APP_API;

export const Login = async (data) => {
  //setting up config for login

  const config = {
    method: "post",
    url: url + apiEndPoints.USER.login,
    data,
  };

  return await asyncFunc(config);
};
