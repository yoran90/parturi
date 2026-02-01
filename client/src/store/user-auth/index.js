import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  userProfile: null
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

//! user logout
export const userLogout = createAsyncThunk("userAuth/logout", async () => {
  try {
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
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/check-user`, { withCredentials: true });
      return response.data
    } catch (error) {
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
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      //! GOOGLE LOGIN
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user || action.payload || null;
      })
      .addCase(googleLogin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
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

      //! USER LOGOUT
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(userLogout.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
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