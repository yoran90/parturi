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

//! user login
export const userLogin = createAsyncThunk("userAuth/login", async ({ email, password }) => {
  try {
    const response = await axios.post("http://localhost:8001/api/user/userLogin", { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error);
  }
})

//! get user by id
export const getUserById = createAsyncThunk("userAuth/getUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:8001/api/user/${id}`, { withCredentials: true });
    return response.data;  
  } catch (error) {
    console.log(error);
    
  }
});

//! user logout
export const userLogout = createAsyncThunk("userAuth/logout", async () => {
  try {
    const response = await axios.post("http://localhost:8001/api/user/userLogout",{}, { withCredentials: true });
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
      const response = await axios.get("http://localhost:8001/api/user/check-user", { withCredentials: true });
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
        state.user = action.payload.user;
      })
      .addCase(userLogin.rejected, (state) => {
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
        state.user = action.payload.user;
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