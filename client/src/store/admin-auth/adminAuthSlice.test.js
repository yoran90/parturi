import reducer, {
  setAdmin,
  adminLogin,
  adminLogout,
  checkAdminAuth,
  getUserByIdInAdmin,
  getUserDataById,
  superAdminUpdateUserRole,
  getUserForAdminForChangeRole,
  adminDeleteUserOrAdmin,
} from "./index";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("adminAuthSlice", () => {
  const initialState = {
    isAuthenticated: false,
    loading: false,
    admin: null,
    editUser: null,
    shopMedia: null,
  };

  let store;

  beforeEach(() => {
    store = configureStore({ reducer: { admin: reducer } });
    vi.clearAllMocks();
  });

  // ------------------------
  // Reducer: setAdmin
  // ------------------------
  it("should handle setAdmin", () => {
    const nextState = reducer(initialState, setAdmin({ name: "Admin" }));
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.admin).toEqual({ name: "Admin" });
  });

  // ------------------------
  // adminLogin
  // ------------------------
  it("should handle adminLogin.fulfilled", async () => {
    axios.post.mockResolvedValueOnce({ data: { user: { name: "Admin" } } });
    await store.dispatch(adminLogin({ email: "a@a.com", password: "1234" }));
    const state = store.getState().admin;
    expect(state.isAuthenticated).toBe(true);
    expect(state.admin).toEqual({ name: "Admin" });
    expect(state.loading).toBe(false);
  });

  it("should handle adminLogin.rejected", async () => {
    axios.post.mockRejectedValueOnce({ response: { data: "Invalid credentials" } });
    await store.dispatch(adminLogin({ email: "a@a.com", password: "wrong" }));
    const state = store.getState().admin;
    expect(state.isAuthenticated).toBe(false);
    expect(state.admin).toBeNull();
    expect(state.loading).toBe(false);
  });

  // ------------------------
  // adminLogout
  // ------------------------
  it("should handle adminLogout.fulfilled", async () => {
    store = configureStore({
      reducer: { admin: reducer },
      preloadedState: { admin: { ...initialState, isAuthenticated: true, admin: { name: "Admin" } } },
    });
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    await store.dispatch(adminLogout());
    const state = store.getState().admin;
    expect(state.isAuthenticated).toBe(false);
    expect(state.admin).toBeNull();
    expect(state.loading).toBe(false);
  });

  // ------------------------
  // checkAdminAuth
  // ------------------------
  it("checkAdminAuth success", async () => {
    axios.get.mockResolvedValueOnce({ data: { user: { name: "Admin" } } });
    await store.dispatch(checkAdminAuth());
    const state = store.getState().admin;
    expect(state.isAuthenticated).toBe(true);
    expect(state.admin).toEqual({ name: "Admin" });
  });

  it("checkAdminAuth failure", async () => {
    axios.get.mockRejectedValueOnce({ response: { data: "Unauthorized" } });
    await store.dispatch(checkAdminAuth());
    const state = store.getState().admin;
    expect(state.isAuthenticated).toBe(false);
    expect(state.admin).toBeNull();
  });

  // ------------------------
  // getUserByIdInAdmin
  // ------------------------
  it("getUserByIdInAdmin success", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { id: 1, name: "User1" } } });
    await store.dispatch(getUserByIdInAdmin(1));
    const state = store.getState().admin;
    expect(state.admin).toEqual({ id: 1, name: "User1" });
  });

  it("getUserByIdInAdmin rejected", async () => {
    axios.get.mockRejectedValueOnce({});
    await store.dispatch(getUserByIdInAdmin(1));
    const state = store.getState().admin;
    expect(state.admin).toBeNull();
  });

  // ------------------------
  // getUserDataById
  // ------------------------
  it("getUserDataById success", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { id: 2, name: "User2" } } });
    await store.dispatch(getUserDataById(2));
    const state = store.getState().admin;
    expect(state.admin).toEqual({ id: 2, name: "User2" });
  });

  it("getUserDataById rejected", async () => {
    axios.get.mockRejectedValueOnce({});
    await store.dispatch(getUserDataById(2));
    const state = store.getState().admin;
    expect(state.admin).toBeNull();
  });

  // ------------------------
  // superAdminUpdateUserRole
  // ------------------------
  it("superAdminUpdateUserRole success", async () => {
    axios.put.mockResolvedValueOnce({ data: { success: true } });
    await store.dispatch(superAdminUpdateUserRole({ id: 1, role: "admin" }));
    const state = store.getState().admin;
    expect(state.loading).toBe(false);
  });

  it("superAdminUpdateUserRole rejected", async () => {
    axios.put.mockRejectedValueOnce({});
    await store.dispatch(superAdminUpdateUserRole({ id: 1, role: "admin" }));
    const state = store.getState().admin;
    expect(state.loading).toBe(false);
  });

  // ------------------------
  // getUserForAdminForChangeRole
  // ------------------------
  it("getUserForAdminForChangeRole success", async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { id: 3, name: "User3" } } });
    await store.dispatch(getUserForAdminForChangeRole(3));
    const state = store.getState().admin;
    expect(state.editUser).toEqual({ id: 3, name: "User3" });
  });

  it("getUserForAdminForChangeRole rejected", async () => {
    axios.get.mockRejectedValueOnce({ response: { data: { message: "Not found" } } });
    await store.dispatch(getUserForAdminForChangeRole(3));
    const state = store.getState().admin;
    expect(state.editUser).toBeNull();
    expect(state.error).toBe("Not found");
  });

  // ------------------------
  // adminDeleteUserOrAdmin
  // ------------------------
  it("adminDeleteUserOrAdmin success", async () => {
    axios.delete.mockResolvedValueOnce({ data: { success: true } });
    await store.dispatch(adminDeleteUserOrAdmin(4));
    const state = store.getState().admin;
    expect(state.loading).toBe(false);
  });

  it("adminDeleteUserOrAdmin rejected", async () => {
    axios.delete.mockRejectedValueOnce({ response: { data: { message: "Cannot delete" } } });
    await store.dispatch(adminDeleteUserOrAdmin(4));
    const state = store.getState().admin;
    expect(state.loading).toBe(false);
  });
});
