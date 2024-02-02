import store from "../../Redux/store";
export const setHeaders = (contentType, token, jwtToken) => {
  const userData = store.getState().userData.userData;

  let headers = {
    "Content-Type": contentType,
    "X-Timezone-Offset": new Date().getTimezoneOffset(),
    "Timezone-Central": Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
  if (jwtToken) headers.Authorization = `Bearer ${jwtToken}`;
  if (token && !jwtToken) {
    headers.Authorization = `Bearer ${userData.jwtToken}`;
  }
  return headers;
};
