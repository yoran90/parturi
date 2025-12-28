import request from "supertest";
import Auth from "../../models/authModel.js";
import { jest } from "@jest/globals";


jest.unstable_mockModule("google-auth-library", () => ({
  OAuth2Client: jest.fn().mockImplementation(() => ({
    verifyIdToken: jest.fn().mockResolvedValue({
      getPayload: () => ({
        email: "test@gmail.com",
        name: "John",
        family_name: "Doe",
        picture: "https://test-image.com/avatar.png",
        
      }),
    }),
  })),
}));

const app = (await import("../../app.js")).default;

describe("POST /api/user/google-login", () => {
  it("should login a new user with Google", async () => {
    const res = await request(app)
      .post("/api/user/google-login")
      .send({ credential: "fake-google-token" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe("test@gmail.com");
    expect(res.body.token).toBeDefined();
    expect(res.headers["set-cookie"]).toBeDefined();

    const userInDb = await Auth.findOne({ email: "test@gmail.com" });
    expect(userInDb).toBeTruthy();
    expect(userInDb.firstName).toBe("John");
  });

  it("should login an existing user with Google", async () => {
    await new Auth({
      firstName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      isEmailVerified: true,
      password: "randompassword",
      gender: "Not specified",
    }).save();

    const res = await request(app)
      .post("/api/user/google-login")
      .send({ credential: "fake-google-token" });

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("test@gmail.com");

    const count = await Auth.countDocuments({ email: "test@gmail.com" });
    expect(count).toBe(1); 
  });

  it("should return 400 if credential is missing", async () => {
    const res = await request(app)
      .post("/api/user/google-login")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Credential is required");
  });
});
