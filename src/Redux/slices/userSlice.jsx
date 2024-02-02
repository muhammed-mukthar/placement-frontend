import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const namespace = "tenant";
const initialState = {
  userData: {},
  isLogged: false,
};

const tenantSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setAuth: (state, action) => {
      state.isLogged = action.payload;
    },
    clearAuth: () => initialState,
  },
});

export const { setAuth, clearAuth, setUser } = tenantSlice.actions;
export default tenantSlice.reducer;
