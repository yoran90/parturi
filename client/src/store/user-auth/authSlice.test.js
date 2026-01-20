import reducer, {
  setUser,
  userRegister,
  userLogin,
  googleLogin,
  getUserById,
  getProfileUserById,
  userLogout,
  userMiddleware,
} from "./index";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("authSlice", () => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    userProfile: null,
  };

  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { auth: reducer } });
    vi.clearAllMocks();
  });

  // ------------------------
  // Reducer: setUser
  // ------------------------
  it("should handle setUser", () => {
    const nextState = reducer(initialState, setUser({ name: "User" }));
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.user).toEqual({ name: "User" });
  });

  // ------------------------
  // userRegister
  // ------------------------
  it("should handle userRegister.fulfilled", async () => {
    axios.post.mockResolvedValueOnce({ data: { message: "Registered" } });
    await store.dispatch(userRegister({
      firstName: "John",
      lastName: "Doe",
      gender: "men",
      email: "j@d.com",
      password: "123456"
    }));
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it("should handle userRegister.rejected", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Error" } } });
    await store.dispatch(userRegister({
      firstName: "John",
      lastName: "Doe",
      gender: "men",
      email: "j@d.com",
      password: "123456"
    }));
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  // ------------------------
  // userLogin
  // ------------------------
  it("userLogin success", async () => {
    axios.post.mockResolvedValueOnce({ data: { user: { name: "John" } } });
    await store.dispatch(userLogin({ email: "a@a.com", password: "1234" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ name: "John" });
  });

  it("userLogin rejected", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Invalid" } } });
    await store.dispatch(userLogin({ email: "a@a.com", password: "wrong" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  // ------------------------
  // googleLogin
  // ------------------------
  it("googleLogin success", async () => {
    axios.post.mockResolvedValueOnce({ data: { user: { name: "GoogleUser" } } });
    await store.dispatch(googleLogin({ credential: "token" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ name: "GoogleUser" });
  });

  it("googleLogin rejected", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: { message: "Google Error" } } });
    await store.dispatch(googleLogin({ credential: "token" }));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  // ------------------------
  // getUserById
  // ------------------------
  it("getUserById success", async () => {
    axios.get.mockResolvedValueOnce({ data: { id: 1, name: "User1" } });
    await store.dispatch(getUserById(1));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ id: 1, name: "User1" });
  });

  it("getUserById rejected", async () => {
    axios.get.mockRejectedValueOnce({});
    await store.dispatch(getUserById(1));
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  // ------------------------
  // getProfileUserById
  // ------------------------
  it("getProfileUserById success", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { id: 2, name: "ProfileUser" } } });
    await store.dispatch(getProfileUserById(2));
    const state = store.getState().auth;
    expect(state.userProfile).toEqual({ id: 2, name: "ProfileUser" });
  });

  it("getProfileUserById rejected", async () => {
    axios.get.mockRejectedValueOnce({ response: { data: "Error" } });
    await store.dispatch(getProfileUserById(2));
    const state = store.getState().auth;
    expect(state.userProfile).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  // ------------------------
  // userLogout
  // ------------------------
  it("userLogout success", async () => {
    store = configureStore({
      reducer: { auth: reducer },
      preloadedState: { auth: { ...initialState, isAuthenticated: true, user: { name: "John" } } },
    });
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    await store.dispatch(userLogout());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  // ------------------------
  // userMiddleware
  // ------------------------
  it("userMiddleware success", async () => {
    axios.get.mockResolvedValueOnce({ data: { user: { name: "MiddlewareUser" } } });
    await store.dispatch(userMiddleware());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ name: "MiddlewareUser" });
  });

  it("userMiddleware rejected", async () => {
    axios.get.mockRejectedValueOnce({ response: { data: "Unauthorized" } });
    await store.dispatch(userMiddleware());
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
