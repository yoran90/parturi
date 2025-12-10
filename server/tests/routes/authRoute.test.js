import request from "supertest";
import app from "../../server.js";



describe("Auth routes (basic smoke", () => {
  test("GET /api/auth/check-auth without token shuold be 401 or 403", async () => {
    const res = await request(app).get("/api/auth/check-auth");
    expect([401, 403]).toContain(res.status);
  });
});

test("POST /api/auth/login shuold return 400 if email or password missing", async () => {
  const res = await request(app)
  .post("/api/auth/login")
  .send({});

  expect(res.statusCode).toBe(400);
  expect(res.body).toHaveProperty("message");

});