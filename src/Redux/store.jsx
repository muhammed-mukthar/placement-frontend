import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PERSIST } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  userData: userSlice,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
