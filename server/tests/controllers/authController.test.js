import { jest } from "@jest/globals";

import bcrypt, { compare, hash } from "bcryptjs";


await jest.unstable_mockModule("../../models/authModel.js", () => ({
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));



const { default: Auth } = await import("../../models/authModel.js");
const { register } = await import("../../controllers/authController.js");

//! REGISTER TEST
describe("Auth controller - register", () => {
  test("should return 400 if required fields are missing", async () => {
    const req = { body: {} };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });

  test("should return 400 if user already exists", async () => {
    const req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        email: "test@test.com",
        password: "123456",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Auth.findOne.mockResolvedValue({ email: "test@test.com" });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "User already exists",
    });
  });
});


test("should register user successfully and return 201", async () => {
  const req = {
    body: {
      firstName: "John",
      lastName: "Doe",
      gender: "male",
      email: "test@test.com",
      password: "123456",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // pretend user does NOT exist
  Auth.findOne.mockResolvedValue(null);

  // pretend password is hashed
  jest.spyOn(bcrypt, "genSalt").mockResolvedValue("salt");
  jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");

  // pretend user is created in mongoDB
  Auth.create.mockResolvedValue({
    firstName: "John",
    email: "test@test.com",
  });

  await register(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    message: "User created successfully",
    user: {
      firstName: "John",
      email: "test@test.com",
    },
  });
});


//! LOGIN TEST
test("login shuold return 404 if user not found", async () => {
  const req = {
    body: {
      email: "notfound@test.com",
      password: "123456",
    },
  };
  
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };

  // prtend user does NOT exist
  Auth.findOne.mockResolvedValue(null);

  const { login } = await import("../../controllers/authController.js");
  await login(req, res);
  
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ 
    message: "User not found" 
  });
});

// incorrect login password //
test("login shuold return 401 if password is incorrect", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "wrongpassword",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };

  // fake user form MONGODB
  Auth.findOne.mockResolvedValue({
    email: "test@test.com",
    password: "hashedPassword",
  });

  
  jest.spyOn(bcrypt, "compare").mockResolvedValue(false);


  const { login } = await import("../../controllers/authController.js");
  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ 
    success: false,
    message: "Invalid email or password" 
  });
});