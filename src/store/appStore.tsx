import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./slice/countrySlice";

export const appStore = configureStore({
  reducer: {
    country: countryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
