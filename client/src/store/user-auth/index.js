import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

//! user register 
export const userRegister = createAsyncThunk("userAuth/register", async ({ firstName, lastName, gender, email, password }) => {
  try {
    const response = await axios.post("http://localhost:8001/api/auth/register", { firstName, lastName, gender, email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(userRegister.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },  
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;