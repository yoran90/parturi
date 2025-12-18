import request from 'supertest';
import app from '../app.js';

describe("Test /test route", () => {
  it("should return 'API is working!'", async () => {
    const res = await request(app).get("/test"); 
    expect(res.statusCode).toBe(200);
    expect(res.body).toBe("API is working!");
  });
});
