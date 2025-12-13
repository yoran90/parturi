import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "./admin-auth";
import userAuthReducer from "./user-auth";


const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    userAuth: userAuthReducer
    
  },
});

export default store;
