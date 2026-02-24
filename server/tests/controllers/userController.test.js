import { jest } from "@jest/globals";



let destroyMock = jest.fn();
let uploadMock = jest.fn();

jest.unstable_mockModule("cloudinary", () => ({
  default: {
    v2: {
      uploader: {
        destroy: destroyMock,
        upload: uploadMock,
      },
    },
  },
}));




jest.unstable_mockModule("../../models/reviewsModel.js", () => ({
  default: {
    find: jest.fn(),
    findByIdAndDelete: jest.fn(),
    updateMany: jest.fn(),
  },
}));



jest.unstable_mockModule("../../utlis/sendEmail.js", () => ({
  default: jest.fn(),
}));


jest.unstable_mockModule("../../models/authModel.js", () => ({
  default: {
    findOne: jest.fn(),
    findById: jest.fn(), 
    findByIdAndDelete: jest.fn(),
  },
}));

jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    compare: jest.fn(),
    hash: jest.fn(),
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(),
  },
}));



const Auth = (await import("../../models/authModel.js")).default;
const Reviews = (await import("../../models/reviewsModel.js")).default;
const sendEmail = (await import("../../utlis/sendEmail.js")).default;
const bcrypt = (await import("bcryptjs")).default;
const jwt = (await import("jsonwebtoken")).default;


const { userLogin, userForgetPassword, userResetPassword, sendVerificationEmail, getUserById, getProfileUserById, userUpdateOwnData, userLogout, userDeleteOwnAccount } = await import("../../controllers/userController.js");


//! user login
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


//! user forget password
describe("userForgetPassword", () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: "test@example.com" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should return 404 if user not found", async () => {
    Auth.findOne.mockResolvedValue(null);
    await userForgetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "User not found" });
  });

  it("should send password reset email if user exists", async () => {
    const fakeUser = {
      email: "test@example.com",
      generatePasswordReset: jest.fn(() => "fake-reset-token"),
      save: jest.fn(),
    };
    Auth.findOne.mockResolvedValue(fakeUser);

    await userForgetPassword(req, res);

    expect(fakeUser.generatePasswordReset).toHaveBeenCalled();
    expect(fakeUser.save).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@example.com",
        subject: "Password Reset Request",
        htmlContent: expect.stringContaining("fake-reset-token")
      })
    );
    expect(res.json).toHaveBeenCalledWith({ message: "Password reset link sent to email" });
  });


   it("should return 500 on server error", async () => {
    Auth.findOne.mockRejectedValue(new Error("DB error"));

    await userForgetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });


});


//! user reset password
describe("userResetPassword", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { token: "valid-token" },
      body: { password: "newPassword123" },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it("should return 400 if password is missing", async () => {
    req.body.password = undefined;

    await userResetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Password is required" });
  });

  it("should return 400 if token is invalid or expired", async () => {
    Auth.findOne = jest.fn().mockResolvedValue(null);

    await userResetPassword(req, res);

    expect(Auth.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid or expired password reset token" });
  });

  it("should reset password successfully", async () => {
    const fakeUser = {
      password: "oldPassword",
      resetPasswordToken: "hashed-token",
      resetPasswordExpires: Date.now() + 3600000, 
      save: jest.fn(),
    };

    Auth.findOne = jest.fn().mockResolvedValue(fakeUser);
    bcrypt.hash.mockResolvedValue("hashedNewPassword");

    await userResetPassword(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith("newPassword123", 10);
    expect(fakeUser.password).toBe("hashedNewPassword");
    expect(fakeUser.resetPasswordToken).toBeUndefined();
    expect(fakeUser.resetPasswordExpires).toBeUndefined();
    expect(fakeUser.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Password reset successful ✅ Please login with your new password",
    });
  });

  it("should handle server error and return 500", async () => {
    Auth.findOne = jest.fn().mockRejectedValue(new Error("DB error"));

    await userResetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});


//! user send verify email again
describe("sendVerificationEmail", () => {
  let req, res;

  beforeEach(() => {
    req = { body: { email: "test@example.com" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it("should return 404 if user not found", async () => {
    Auth.findOne = jest.fn().mockResolvedValue(null);

    await sendVerificationEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "User not found" });
  });

  it("should return 400 if email already verified", async () => {
    const user = { isEmailVerified: true };
    Auth.findOne = jest.fn().mockResolvedValue(user);

    await sendVerificationEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Email is already verified" });
  });

  it("should send verification email if user exists and not verified", async () => {
    const fakeUser = {
      email: "test@example.com",
      isEmailVerified: false,
      generateEmailVerificationToken: jest.fn(() => "fake-token"),
      save: jest.fn(),
    };

    Auth.findOne = jest.fn().mockResolvedValue(fakeUser);

    await sendVerificationEmail(req, res);

    expect(fakeUser.generateEmailVerificationToken).toHaveBeenCalled();
    expect(fakeUser.save).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@example.com",
        subject: "Email Verification",
        htmlContent: expect.stringContaining("fake-token"),
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Verification email sent. Please check your email.",
    });
  });

  it("should handle server error and return 500", async () => {
    Auth.findOne = jest.fn().mockRejectedValue(new Error("DB error"));

    await sendVerificationEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});


//! GET USER BY ID
describe("getUserById", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: "user123" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  it("should return 404 if user not found", async () => {
    Auth.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await getUserById(req, res);

    expect(Auth.findById).toHaveBeenCalledWith("user123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "User not found" });
  });

  it("should return 200 with user data if user exists", async () => {
    const fakeUser = { _id: "user123", firstName: "John", lastName: "Doe" };
    Auth.findById = jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue(fakeUser),
    });

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeUser });
  });

  it("should return 500 on server error", async () => {
    Auth.findById = jest.fn().mockImplementation(() => {
      throw new Error("DB error");
    });

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});
//! GET PROFILE USER BY ID
describe("getProfileUserById controller", () => {
  let req, res;

  beforeEach(() => {
    req = { params: { id: "user123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("returns 404 if user not found", async () => {
    Auth.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(null),
    });

    await getProfileUserById(req, res);

    expect(Auth.findById).toHaveBeenCalledWith("user123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User not found",
    });
  });

  it("returns 200 with user data if user exists", async () => {
    const fakeUser = { _id: "user123", firstName: "John" };

    Auth.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue(fakeUser),
    });

    await getProfileUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: fakeUser,
    });
  });

  it("returns 500 if database error occurs", async () => {
    Auth.findById.mockReturnValue({
      select: jest.fn().mockRejectedValue(new Error("DB error")),
    });

    await getProfileUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });
});



//! update own user by id
it("should return 404 if user not found", async () => {
  Auth.findById.mockResolvedValue(null);

  const req = {
    user: { id: "507f1f77bcf86cd799439011" },  // id shuold be 24 charachter bc in mongo DB have 24 charachter
    body: {},
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userUpdateOwnData(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: "User not found",
  });
});

it("should update user data without image", async () => {
  const saveMock = jest.fn();

  const mockUser = {
    favoriteName: "",
    firstName: "",
    lastName: "",
    save: saveMock,
  };

  Auth.findById.mockResolvedValue(mockUser);

  const req = {
    user: { id: "507f1f77bcf86cd799439011" },
    body: {
      favoriteName: "John",
      firstName: "John",
      lastName: "Doe",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userUpdateOwnData(req, res);

  expect(mockUser.firstName).toBe("John");
  expect(mockUser.lastName).toBe("Doe");
  expect(saveMock).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
});

it("should update user profile image and delete old one", async () => {
  const saveMock = jest.fn();

  const mockUser = {
    profileImage: { publicId: "old-image-id" },
    save: saveMock,
  };

  Auth.findById.mockResolvedValue(mockUser);

  uploadMock.mockResolvedValue({
    secure_url: "http://cloudinary.com/new.jpg",
    public_id: "new-image-id",
  });

  const req = {
    user: { id: "507f1f77bcf86cd799439011" },
    body: {},
    file: {
      path: "/tmp/test-image.jpg",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userUpdateOwnData(req, res);

  // old image deleted
  expect(destroyMock).toHaveBeenCalledWith("old-image-id");

  // new image uploaded
  expect(uploadMock).toHaveBeenCalledWith("/tmp/test-image.jpg", {
    folder: "paturi",
  });

  // user updated
  expect(mockUser.profileImage).toEqual({
    url: "http://cloudinary.com/new.jpg",
    publicId: "new-image-id",
  });

  expect(saveMock).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
});



//! user logout
describe("userLogout", () => {
  let req, res;

  beforeEach(() => {
    req = {}; 
    res = {
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should clear userToken cookie and return success message", async () => {
    await userLogout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("userToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User logged out successfully" });
  });
  it("should return 500 if there is a server error", async () => {
    res.clearCookie = jest.fn(() => { throw new Error("Cookie error"); });

    await userLogout(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Cookie error" });
  });
});


//! DELETE USER OWN ACCOUNT BY ID  WHEN DELETE USER ALSO DELETE PROFILE IMAGE FROM CLOUDINARY
//! ( AND DELETE USER REVIEW AND LIKES AND COMMENTS AND ETC WHAT EVER IF IN FUTEURE NEED TO DELETE )

const validUserId = "507f1f77bcf86cd799439011"; 

it("should return 404 if userId missing", async () => {
  const req = { user: {} };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    clearCookie: jest.fn(),
  };

  await userDeleteOwnAccount(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    message: "User Unauthorized",
  });
});

it("should return 404 if user not found", async () => {
  Auth.findById.mockResolvedValue(null);

  const req = { user: { id: validUserId } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    clearCookie: jest.fn(),
  };

  await userDeleteOwnAccount(req, res);

  expect(Auth.findById).toHaveBeenCalledWith(validUserId);
  expect(res.status).toHaveBeenCalledWith(404);
});





it("should delete user account successfully", async () => {

  Auth.findById.mockResolvedValue({
    _id: validUserId,
    profileImage: { publicId: "profile123" },
  });

  Auth.findByIdAndDelete.mockResolvedValue({});
  Reviews.find.mockResolvedValue([]);      
  Reviews.updateMany.mockResolvedValue({});

  const req = {
    user: { id: validUserId },
  };

  const res = {
    clearCookie: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userDeleteOwnAccount(req, res);

  expect(destroyMock).toHaveBeenCalledWith("profile123");
  expect(Auth.findByIdAndDelete).toHaveBeenCalledWith(validUserId);
  expect(res.clearCookie).toHaveBeenCalledWith(
    "userToken",
    expect.any(Object)
  );
  expect(res.status).toHaveBeenCalledWith(200);
});

