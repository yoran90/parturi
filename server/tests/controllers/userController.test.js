import { jest } from "@jest/globals";


jest.unstable_mockModule("../../models/authModel.js", () => ({
  default: {
    findOne: jest.fn(),
  },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    compare: jest.fn(),
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(),
  },
}));


const Auth = (await import("../../models/authModel.js")).default;
const bcrypt = (await import("bcryptjs")).default;
const jwt = (await import("jsonwebtoken")).default;

const { userLogin, userForgetPassword } = await import("../../controllers/userController.js");

describe("User Controller - userLogin", () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: "test@example.com", password: "password123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 400 if email or password missing", async () => {
    req.body = {};
    await userLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "All fields are required" });
  });

  it("should return 404 if user not found", async () => {
    Auth.findOne.mockResolvedValue(null);

    await userLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  it("should return 401 if email is not verified", async () => {
    Auth.findOne.mockResolvedValue({ isEmailVerified: false });

    await userLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Please verify your email before logging in" });
  });

  it("should return 401 if password is incorrect", async () => {
    Auth.findOne.mockResolvedValue({ isEmailVerified: true, password: "hashedPassword" });
    bcrypt.compare.mockResolvedValue(false);

    await userLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid email or password" });
  });

  it("should login user successfully", async () => {
    const fakeUser = {
      _id: "user123",
      isEmailVerified: true,
      password: "hashedPassword",
      firstName: "John",
      lastName: "Doe",
      favoriteName: "JD",
      gender: "male",
      profileImage: null,
      email: "test@example.com",
      role: "user",
      bio: "bio",
      addressOne: "",
      addressTwo: "",
      country: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      notes: "",
      timezone: "",
    };

    Auth.findOne.mockResolvedValue(fakeUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fakeToken");

    await userLogin(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.cookie).toHaveBeenCalledWith(
      "userToken",
      "fakeToken",
      expect.any(Object)
    );
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      token: "fakeToken",
      user: expect.objectContaining({ id: "user123" })
    }));
  });

  it("should handle server error and return 500", async () => {
    Auth.findOne.mockRejectedValue(new Error("DB error"));

    await userLogin(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});

