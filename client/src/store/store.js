import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./admin-auth";


const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
  },
});

export default store;
