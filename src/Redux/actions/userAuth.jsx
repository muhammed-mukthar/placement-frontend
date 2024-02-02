import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuth, setUser, clearAuth } from "../slices/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { handleApiError } from "../../helper/helperFunction";
import { Register as RegisterApi } from "../../API/Auth/Register/Register";
import { Login as LoginApi } from "../../API/Auth/Login/login";

export const handleRegisterUser = createAsyncThunk(
  `User/createAcc`,
  async ({ data, cb }, { dispatch }) => {
    try {
      console.log(data, "user data");
      const resp = await RegisterApi(data);
      if (resp && resp.result) {
        toast.success("Account created Successfully");
        cb();
      }
    } catch (error) {
      const message = handleApiError(error);
      toast.error(message);
    }
  }
);

export const handleLoginUser = createAsyncThunk(
  `User/UserLogin`,
  async ({ data, cb }, { dispatch }) => {
    try {
      const resp = await LoginApi(data);
      console.log(resp, "resp");
      if (resp && resp) {
        dispatch(setUser({ ...resp?.result, jwtToken: resp?.token }));
        dispatch(setAuth(true));

        toast.success("Successfully Logged In");
        cb();
      }
    } catch (error) {
      const message = handleApiError(error);
      toast.error(message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  `User/logout-user`,
  async (cb, { dispatch, getState }) => {
    try {
      dispatch(setAuth(false));
      dispatch(setUser(null));
      dispatch(clearAuth());
      toast.success("User logged out successfully");
    } catch (error) {
      console.log(error);
      const message = handleApiError(error);
      toast.error(message);
    }
  }
);
