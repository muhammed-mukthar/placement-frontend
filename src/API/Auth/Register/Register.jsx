import { asyncFunc } from "../../common/asyncFunc";
import { apiEndPoints } from "../../common/endpoints";

const url = import.meta.env.VITE__APP_API;

export const Register = (data) => {
  const config = {
    method: "post",
    url: url + apiEndPoints.USER.register,
    data,
  };

  return asyncFunc(config);
};
