import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  loading: false,
  admin: null,
  editUser: null
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
export const getUserByIdInAdmin = createAsyncThunk("adminAuth/getUserByIdInAdmin", async (id, { rejectWithValue}) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/auth/userForAdmin/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

//! super admin get user data by id
export const getUserDataById = createAsyncThunk("adminAuth/getUserDataById", async (id, { rejectWithValue}) => {
    const response = await axios.get(`http://localhost:8001/api/auth/getUserDataById/${id}`, { withCredentials: true });
    return response.data;
}) 

//! SUPER ADMIN UPDATE USER ROLE (CHANGE USER ROLE)
export const superAdminUpdateUserRole = createAsyncThunk("adminAuth/superAdminUpdateUserRole", async ({ id, role }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`http://localhost:8001/api/auth/updateUserRole/${id}`, { role }, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
});

//! SUPER ADMIN GET USER DATA BY ID FOR CHANGE ROLE (CHANGE USER ROLE)
export const getUserForAdminForChangeRole = createAsyncThunk("adminAuth/getUserForAdminForChangeRole", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/auth/getUserForAdminForChangeRole/${id}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
})

//! super admin delete user or admin
export const adminDeleteUserOrAdmin = createAsyncThunk("adminAuth/adminDeleteUserOrAdmin", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`http://localhost:8001/api/auth/adminDeleteUserOrAdmin/${id}`, { withCredentials: true });
    return response.data
  } catch (error) {
    console.log(error);
  }
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
      .addCase(getUserByIdInAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserByIdInAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(getUserByIdInAdmin.rejected, (state) => {
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
      
      //! SUPER ADMIN UPDATE USER ROLE
      .addCase(superAdminUpdateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(superAdminUpdateUserRole.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(superAdminUpdateUserRole.rejected, (state) => {
        state.loading = false;
      })

      //! SUPER ADMIN GET USER DATA FOR CHANGE ROLE
      .addCase(getUserForAdminForChangeRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserForAdminForChangeRole.fulfilled, (state, action) => {
        state.loading = false;        
        state.editUser = action.payload.data || null;
      })
      .addCase(getUserForAdminForChangeRole.rejected, (state) => {
        state.loading = false;
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
