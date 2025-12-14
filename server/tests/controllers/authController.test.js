import { afterEach, beforeAll, describe, expect, jest, test } from "@jest/globals";
import Auth from "../../models/authModel.js";
import bcrypt from "bcryptjs";
import { createTestToken } from "../utils/createTestToken.js";
import jwt from "jsonwebtoken";

jest.unstable_mockModule("../../utlis/sendEmail.js", () => ({
  __esModule: true,
  default: jest.fn(),
}));

let request;
let app;
let sendEmail;

beforeAll(async () => {
  request = (await import("supertest")).default;
  app = (await import("../../server.js")).default;
  sendEmail = (await import("../../utlis/sendEmail.js")).default;
});

describe("POST /api/auth/register", () => {
  
  test("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "",
        lastName: "Doe",
        gender: "male",
        email: "john@example.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  test("should return 400 if user already exists", async () => {

    jest.spyOn(Auth, "findOne").mockResolvedValue({
      email: "john@example.com",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        email: "john@example.com",
        password: "123456",
      });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });
});

//! send Email for verify email
describe("POST /api/auth/admin-send-verification-email", () => {
  test("shuold return 404 if user not found", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue(null);
    const res = await request(app)
    .post("/api/auth/admin-send-verification-email")
    .send({
      email: "john@example.com",
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  // if email already verified
  test("shuold return 400 if eamil already verified", async () => {

    jest.spyOn(Auth, "findOne").mockResolvedValue({
      email: "john@example.com",
      isEmailVerified: true,
    });

    const res = await request(app)
    .post("/api/auth/admin-send-verification-email")
    .send({
      email: "john@example.com",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email is already verified");
  });

  // if user exsis and not verified
  test("shuold send verification eamil if user exist and not verified", async () => {
    const mockUser = {
      email: "john@example.com",
      isEmailVerified: false,
      generateEmailVerificationToken: jest.fn().mockReturnValue("mockToken123"),
      save: jest.fn(),
    };

    jest.spyOn(Auth, "findOne").mockResolvedValue(mockUser);

    const res = await request(app)
    .post("/api/auth/admin-send-verification-email")
    .send({email: "john@example.com"});

    expect(mockUser.generateEmailVerificationToken).toHaveBeenCalled();
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Verification email sent. Please check your email.");
  });
});

//! verifyEmail
describe("POST /api/auth/admin-verify-email/:token", () => {

  test("shuold return 400 if token is missing", async () => {
    const res = await request(app)
    .post("/api/auth/admin-verify-email/");

    expect(res.statusCode).toBe(404);
    // the reason why we don't need message token is required beacuse token expired 
  });

  test("shuold return 400 if token is invalid or expired", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue(null);

    const res = await request(app)
    .post("/api/auth/admin-verify-email/invalidtoken123");

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  test("shuold verify email successfully with valid token", async () => {
    const mockUser = {
      isEmailVerified: false,
      emailVerificationToken: "hashed",
      emailVerificationExpires: Date.now() + 10000,
      save: jest.fn(),
    };
    
    jest.spyOn(Auth, "findOne").mockResolvedValue(mockUser);

    const res = await request(app)
    .post("/api/auth/admin-verify-email/validtoken123");

    expect(mockUser.save).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Email verified successfully. You can now login.");

  });
});

//! forgot password
describe("POST /api/auth/admin-forget-password", () => {

  test("shuold return 404 if user not found", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue(null);

    const res = await request(app)
    .post("/api/auth/admin-forget-password")
    .send({email: "john@example.com"});

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");

  });

  test("shuold send reset password email if user exisit", async () => {

    const mockUser = {
      email: "john@example.com",
      generatePasswordReset: jest.fn().mockReturnValue("mockToken123"),
      save: jest.fn(),
    };

    jest.spyOn(Auth, "findOne").mockResolvedValue(mockUser);

    const res = await request(app)
    .post("/api/auth/admin-forget-password")
    .send({email: "john@example.com"});

    expect(mockUser.generatePasswordReset).toHaveBeenCalled();
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset link sent to email");
  });
});

//! reset password
describe("POST /api/auth/admin-reset-password/:token", () => {
  test("shuold return 400 if password is missing", async () => {
    const res = await request(app)
    .post("/api/auth/admin-reset-password/faketoken")
    .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Password is required");
  });

  test("shuold return 400 if token is invalid or expired", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue(null);

    const res = await request(app)
    .post("/api/auth/admin-reset-password/invalidtoken123")
    .send({ password: "newpassword" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid or expired password reset token");
  });

  test("shuold reset password successfully", async () => {

    const mockUser = {
      resetPasswordToken: "hashedToken",
      resetPasswordExpires: Date.now() + 10000,
      save: jest.fn(),
    };

    jest.spyOn(Auth, "findOne").mockResolvedValue(mockUser);

    jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword123");


    const res = await request(app)
    .post("/api/auth/admin-reset-password/validtoken123")
    .send({ password: "newpassword" });


    expect(mockUser.password).toBe("hashedPassword123");
    expect(mockUser.resetPasswordToken).toBeUndefined();
    expect(mockUser.resetPasswordExpires).toBeUndefined();
    expect(mockUser.save).toHaveBeenCalled();

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset successful ✅ Please login with your new password");
  });
});

//! get user by id for admin
describe("GET /api/auth/userForAdmin/:id", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("shuold return 403 if normal user access another user", async () => {
    const tokenPayload = {
      id: "user1",
      role: "user"
    };

    jest.spyOn(Auth, "findById").mockResolvedValue({
      _id: "user2"
    });

    const res = await request(app)
    .get("/api/auth/userForAdmin/user2")
    .set("Authorization", `Bearer ${createTestToken(tokenPayload)}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });
  
  // admin access any user 
  test("shuold allow admin to access any user", async () => {
    const tokenPayload = {
      id: "admin1",
      role: "admin"
    };
    
    jest.spyOn(Auth, "findById").mockResolvedValue({
      _id: "user2",
      email: "user2@test.com"
    });

    const res = await request(app)
    .get("/api/auth/userForAdmin/user2")
    .set("Authorization", `Bearer ${createTestToken(tokenPayload)}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data._id).toBe("user2");
  });

  // user not found
  test("shuold return 404 if user does not exist", async () => {
    const tokenPaylod = {
      id: "admin1",
      role: "admin"
    };
    

    jest.spyOn(Auth, "findById").mockResolvedValue(null);

    const res = await request(app)
    .get("/api/auth/userForAdmin/user2")
    .set("Authorization", `Bearer ${createTestToken(tokenPaylod)}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");

  });
});

//! update user by id for admin change own data
describe("PUT /api/auth/updateUser", () => {
  test("shuold return 404 if user not found", async () => {
    jest.spyOn(Auth, "findById").mockResolvedValue(null);

    const token = createTestToken({
      id: "user1",
      role: "admin"
    });

    const res = await request(app)
    .put("/api/auth/updateUser")
    .set("Authorization", `Bearer ${token}`)
    .send({
      firstName: "John",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  test("shuold user fileds successfully", async () => {
    const mockUser = {
      favoriteName: "Old",
      firstName: "Old",
      save: jest.fn(),
    };
    
    jest.spyOn(Auth, "findById").mockResolvedValue(mockUser);

    const token = createTestToken({
      id: "user1",
      role: "admin"
    });

    const res = await request(app)
    .put("/api/auth/updateUser")
    .set("Authorization", `Bearer ${token}`)
    .send({
      favoriteName: "John",
      firstName: "John",
    });
    
    expect(mockUser.favoriteName).toBe("John");
    expect(mockUser.firstName).toBe("John");
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
  });
});

//! get all user for admin
describe("GET /api/auth/allUsers", () => {
  test("shuold return all users successfully", async () => {
    const mockUsers = [
      {_id: "1", email: "user1@test.com"},
      {_id: "2", email: "user2@test.com"},
    ];
    

    jest.spyOn(Auth, "find").mockResolvedValue(mockUsers);

    const res = await request(app)
    .get("/api/auth/allUsers")
    .set("Authorization", `Bearer ${createTestToken({id: "admin1", role: "admin"})}`);

    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(mockUsers);

  });

  test("shuold return 500 if databases error occurs", async () => {
    jest.spyOn(Auth, "find").mockRejectedValue(new Error("Database error"));

    const res = await request(app)
    .get("/api/auth/allUsers")
    .set("Authorization", `Bearer ${createTestToken({id: "admin1", role: "admin"})}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Database error");
  });
});

//! super admin get all user data
describe("GET /api/auth/getUserDataById/:id", () => {
  test("shuold retunr 403 if not super-admin", async () => {

    const token = createTestToken({
      id: "admin1",
      role: "admin"
    });
    
    const res = await request(app)
    .get("/api/auth/getUserDataById/user1")
    .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Forbidden");
  });

  test("shuold return user except given id for super-admin", async () => {
    const token = createTestToken({
      id: "admin1",
      role: "super-admin"
    });

    const mockUsers = [
      { _id: "user2", email: "user2@test.com" },
      { _id: "user3", email: "user3@test.com" },
    ];

    jest.spyOn(Auth, "find").mockResolvedValue(mockUsers);

    const res = await request(app)
      .get("/api/auth/getUserDataById/user1")
      .set("Authorization", `Bearer ${token}`);

    expect(Auth.find).toHaveBeenCalledWith({ _id: { $ne: "user1" } });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  test("shuold return 500 on databases error", async () => {
    const token = createTestToken({
      id: "super1",
      role: "super-admin"
    });
  
    jest.spyOn(Auth, "find").mockRejectedValue(new Error("Database error"));

    const res = await request(app)
    .get("/api/auth/getUserDataById/user1")
    .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Database error");
  });
});

//! login FOR ADMIN
describe("POST /api/auth/login", () => {
  test("shuold retunr 400 if eamil or password missing", async () => {
    const res = await request(app)
    .post("/api/auth/login")
    .send({email: "admin@test.com"});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email and password are required");
  });

  test("shuold return 400 if user not found", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue(null);

    const res = await request(app)
    .post("/api/auth/login")
    .send({email: "admin@test.com", password: "password"});

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  test("shuold retunr 402 if password wrong", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue({
      password: "hashed",
      isEmailVerified: true,
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

    const res = await request(app)
    .post("/api/auth/login")
    .send({email: "admin@test.com", password: "wrongpass"});

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid email or password");
  });

  test("shuold return 401 if email not verified", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue({
      password: "hashed",
      isEmailVerified: false,
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

    const res = await request(app)
    .post("/api/auth/login")
    .send({email: "admin@test.com", password: "password"});

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Please verify your email before logging in");
  });

  test("shuold login admin successfully", async () => {
    jest.spyOn(Auth, "findOne").mockResolvedValue({
      _id: "admin1",
      email: "admin@test.com",
      firstName: "Admin",
      lastName: "User",
      gender: "male",
      profileImage: null,
      role: "admin",
      password: "hashed",
      isEmailVerified: true,
    });

    jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
    jest.spyOn(jwt, "sign").mockReturnValue("mockToken");

    const res = await request(app)
    .post("/api/auth/login")
    .send({email: "admin@test.com", password: "password"});

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Logged in successfully ✅");
    expect(res.body.token).toBe("mockToken");
    expect(res.body.user.role).toBe("admin");

  });

});

//! logout FOR ADMIN
describe("POST /api/auth/logout", () => {
  test("shuold clear cookie and logout successfully", async () => {
    const res = await request(app)
    .post("/api/auth/logout");


    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Logged out successfully");

    expect(res.headers["set-cookie"][0]).toMatch(/adminToken=;/);

  });
});

//! SUPER ADMIN UPDATE USER ROLE
// no test yet

//! admin delete user 







describe("DELETE /api/auth/adminDeleteUserOrAdmin/:id", () => {
 

  test("should return 404 if user not found", async () => {
    jest.spyOn(Auth, "findById").mockResolvedValue(null);

    const res = await request(app)
    .delete("/api/auth/adminDeleteUserOrAdmin/user1")
    .set("Authorization", `Bearer ${createTestToken({
      id: "admin1",
      role: "super-admin"
    })}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
  
});

