import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  loading: false,
  admin: null,
};

//! ADMIN LOGIN
export const adminLogin = createAsyncThunk("adminAuth/login", async ({ email, password }) => {
    const response = await axios.post("http://localhost:8001/api/auth/login", { email, password }, { withCredentials: true });
    return response.data;
  }
);

//! ADMIN LOGOUT
export const adminLogout = createAsyncThunk("adminAuth/logout", async () => {
    const response = await axios.post("http://localhost:8001/api/auth/logout",{}, { withCredentials: true });
    return response.data;
  }
);

//! get user by id for admin
export const getUserById = createAsyncThunk("adminAuth/getUserById", async (id, { rejectWithValue}) => {
    const response = await axios.get(`http://localhost:8001/api/auth/user/${id}`, { withCredentials: true });
    return response.data;
  }
);

//! super admin get user data by id
export const getUserDataById = createAsyncThunk("adminAuth/getUserDataById", async (id, { rejectWithValue}) => {
    const response = await axios.get(`http://localhost:8001/api/auth/getUserDataById/${id}`, { withCredentials: true });
    return response.data;
}) 

//! CHECK ADMIN AUTH
export const checkAdminAuth = createAsyncThunk("adminAuth/check-auth", async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8001/api/auth/check-auth", { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      //! ADMIN LOGIN
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.user || null;
      })
      .addCase(adminLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
      })

      //! ADMIN LOGOUT
      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
      })
      .addCase(adminLogout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
      })

      //! get user by id for admin
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
        state.admin = null;
      })

      //! super admin get user data by id
      .addCase(getUserDataById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(getUserDataById.rejected, (state) => {
        state.loading = false;
        state.admin = null;
      })

      //! CHECK ADMIN AUTH
      .addCase(checkAdminAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAdminAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.user;
      })
      .addCase(checkAdminAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
      });
  },
});

export const { setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
