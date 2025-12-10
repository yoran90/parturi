import request from "supertest";
import app from "../../server.js";

describe("AUTH Middleware", () => {
  test("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/api/auth/check-auth");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });
});
