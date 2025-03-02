import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import JobPostsSlice from "./slices/JobPosts";
import FavoriteJobsSlice from "./slices/FavoriteJobs";
import AuthenticationSlice from "./slices/Authentication";

const persistConfig = {
  key: "favoriteJobs",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const persistedReducer = persistReducer(persistConfig, FavoriteJobsSlice);
const persisteAuthdReducer = persistReducer(
  authPersistConfig,
  AuthenticationSlice
);

const rootReducer = combineReducers({
  JobPostsSlice,
  AuthenticationSlice: persisteAuthdReducer,
  FavoriteJobsSlice: persistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
