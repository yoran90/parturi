import request from "supertest";
import app from "../../server.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Auth from "../../models/authModel.js";
import bcrypt from "bcryptjs";


let token;
let userId;

beforeAll(async () => {

  await Auth.deleteMany({ email: "w0w4g@example.com" });

  const hashPassword = await bcrypt.hash("123456", 10);

  const user = await Auth.create({
    firstName: "John",
    lastName: "Doe",
    email: "w0w4g@example.com",
    password: hashPassword,
    role: "user",
    gender: "male",
  });

  userId = user._id;
  token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

});

describe("GET /api/user/check-user (NO TOKEN", () => {
  test("shuold return 401 when user is not logged in", async () => {
    const res = await request(app).get("/api/user/check-user");

    expect(res.statusCode).toBe(401);
  });
});

//! USER LOGIN
describe("POST /api/user/userLogin", () => {
  test("shuold login user with correct credentials", async () => {
    const res = await request(app)
    .post("/api/user/userLogin")
    .send({
      email: "w0w4g@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("user");
  });
});

//! GET USER BY ID  
describe("GET /api/user/getUser/:id", () => {
  test("should return user data when token is valid", async () => {
    const res = await request(app)
      .get(`/api/user/getUser/${userId}`)
      .set("Cookie", [`userToken=${token}`]);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data._id.toString()).toBe(userId.toString());
  });

  test("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .get(`/api/user/getUser/${userId}`);

    expect(res.statusCode).toBe(401);
  });
});

//! USER UPDATE OWN DATA
describe("PUT /api/user/userUpdateData", () => {
  test("shuold return 401 if user is not logged in", async () => {
    const res = await request(app)
    .put("/api/user/userUpdateData")
    .send({
      firstName: "ChangeedName",
      
    });
    expect(res.statusCode).toBe(401);
  });


  test("shuold update user data when token is valid", async () => {
    const res = await request(app)
    .put("/api/user/userUpdateData")
    .set("Cookie", [`userToken=${token}`])
    .send({
      firstName: "Updatejohn",
      lastName: "UpdateDoe",
      email: "w0w4g@example.com",
      gender: "male",
    });


    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.firstName).toBe("Updatejohn");
    expect(res.body.user.lastName).toBe("UpdateDoe");

  });
});

//! USER LOGOUT
describe("POST /api/user/userLogout", () => {
  test("shuold return 401 if user is not logged out", async () => {
    const res = await request(app)
    .post("/api/user/userLogout");

    expect(res.statusCode).toBe(401);
  });
});