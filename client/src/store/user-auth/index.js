import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  userProfile: null,
  userNotifications: [],
};

//! user register 
export const userRegister = createAsyncThunk("userAuth/register", async ({ firstName, lastName, gender, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { firstName, lastName, gender, email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || "Registration failed!";
    return rejectWithValue(message); 
  }
});

//! user login
export const userLogin = createAsyncThunk("userAuth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/userLogin`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message); 
  }
})

//! GOOGLE LOGIN (user login with google account)
export const googleLogin = createAsyncThunk("userAuth/googleLogin", async ({ credential }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/google-login`, { credential  }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
    const message = error.response?.data?.message || error.message;
    return rejectWithValue(message);
  }
});

//! get user by id
export const getUserById = createAsyncThunk("userAuth/getUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${id}`, { withCredentials: true });
    return response.data;  
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || error.message);
  }
});

//! get profile user by id
export const getProfileUserById = createAsyncThunk("userAuth/getProfileUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getProfileUser/${id}`, { withCredentials: true });
    return response.data;  
  } catch (error) {
    console.log(error);
    return rejectWithValue(error.response?.data || error.message);
    
  }
});

//! get notification 
export const getNotifications = createAsyncThunk("notifications", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notifications/get-notifications`, { withCredentials: true }); 
    return response.data;    
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

//! mark notification as read
export const markNotificationAsRead = createAsyncThunk("notifications/mark-as-read", async (id, { rejectWithValue }) => {
  try {    
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/notification/mark-as-read/${id}`, {}, { withCredentials: true });
    return response.data;    
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }  
});

//! user logout
export const userLogout = createAsyncThunk("userAuth/logout", async () => {
  try {
    // Remove local token immediately (avoid stale login on refresh)
    localStorage.removeItem("userToken");
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/userLogout`,{}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
})


//! get check user middleware
export const userMiddleware = createAsyncThunk(
  "userAuth/check-user",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = { withCredentials: true };
      
      // If we have a token in localStorage, send it as Authorization header (fallback for Safari)
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        };
      }
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/check-user`, config);
      
      // Store token if returned
      if (response.data?.token) {
        localStorage.setItem("userToken", response.data.token);
      }
      
      return response.data
    } catch (error) {
      localStorage.removeItem("userToken");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



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
      //! USER REGISTER
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(userRegister.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      //! USER LOGIN
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user || action.payload || null;
        // ✅ Store token in localStorage for Safari compatibility
        if (action.payload?.token) {
          localStorage.setItem("userToken", action.payload.token);
        }
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("userToken");
      })

      //! GOOGLE LOGIN
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user || action.payload || null;
        // ✅ Store token in localStorage for Safari compatibility
        if (action.payload?.token) {
          localStorage.setItem("userToken", action.payload.token);
        }
      })
      .addCase(googleLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("userToken");
      })

      //! GET USER BY ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      //! GET profile USER BY ID
      .addCase(getProfileUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload.data;
      })
      .addCase(getProfileUserById.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userProfile = null;
      })

      //! GET NOTIFICATIONS
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;  
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.userNotifications = {
          ...state.userNotifications,
          notifications: action.payload.notifications
        };
      })
      .addCase(getNotifications.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userNotifications = null; 
      })

      //! MARK NOTIFICATION AS READ
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;  
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.userNotifications = {
          ...state.userNotifications,
          notifications: action.payload.notifications
        };
      })
      .addCase(markNotificationAsRead.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userNotifications = null; 
      })

      //! USER LOGOUT
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // ✅ Clear token from localStorage on logout
        localStorage.removeItem("userToken");
      })
      .addCase(userLogout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        // ✅ Clear token from localStorage even if logout fails
        localStorage.removeItem("userToken");
      })

      //! USER MIDELLWARE
      .addCase(userMiddleware.pending, (state) => {
        state.loading = true;
      })
      .addCase(userMiddleware.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user || action.payload || null;
      })
      .addCase(userMiddleware.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
        
  },  
});


export const { setUser } = authSlice.actions;
export default authSlice.reducer;