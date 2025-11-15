import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};


//! Add information
export const addInformationFiled = createAsyncThunk("auth/addInformation", async (formData) => {
    const response = await axios.post("http://localhost:8001/api/information/addInformation", formData);
    return response.data;
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addInformationFiled.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInformationFiled.fulfilled, (state, action) => {
        state.loading = false;
        // you can decide what to do with the response here:
        console.log("Information added:", action.payload);
      })
      .addCase(addInformationFiled.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
