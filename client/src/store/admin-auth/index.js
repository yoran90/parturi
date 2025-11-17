import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
};


//! login
export const login = createAsyncThunk("auth/login", async (formData) => {
  const response = await axios.post("http://localhost:8001/api/auth/login", formData, { withCredentials: true });
  return response.data;
});

//! logout
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post("http://localhost:8001/api/auth/logout", {}, { withCredentials: true });
  return response.data;
}) 

//! Add information
export const addInformationFiled = createAsyncThunk("auth/addInformation", async ({email, password}) => {
    const response = await axios.post("http://localhost:8001/api/information/addInformation", {email, password});
    return response.data;
  }
);

//! check authentication
export const checkAuth = createAsyncThunk("auth/check-auth", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:8001/api/auth/check-auth", { withCredentials: true });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
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

      //! Add Information
      .addCase(addInformationFiled.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInformationFiled.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Information added:", action.payload);
      })
      .addCase(addInformationFiled.rejected, (state) => {
        state.loading = false;
      })

      //! LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user ? action.payload.user : null;

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      //! LOGOUT
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      //! CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;
