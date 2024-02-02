import axios from "axios";

export const asyncFunc = async (config) => {
         
  try {
    const resp = await axios(config);
    return Promise.resolve(resp.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
