import store from "./store";

describe("Redux store setup", () => {
  it("should have initial state for adminAuth and userAuth", () => {
    const state = store.getState();
    expect(state.adminAuth).toHaveProperty("isAuthenticated", false);
    expect(state.adminAuth).toHaveProperty("loading", false);
    expect(state.userAuth).toHaveProperty("isAuthenticated", false);
    expect(state.userAuth).toHaveProperty("loading", false);
  });
});
