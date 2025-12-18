import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";

describe("Server Test with In-Memory MongoDB", () => {
  it("should return API is working!", async () => {
    const res = await request(app).get("/test");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("API is working!");
  });

  it("should connect to in-memory MongoDB", async () => {
    const dbName = mongoose.connection.name;
    console.log("Connected DB Name:", dbName);
    expect(dbName).toBeTruthy(); // should print a random in-memory DB name
  });
});
