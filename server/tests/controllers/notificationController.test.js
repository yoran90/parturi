// tests/controllers/notificationController.test.js
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app.js";
import Notification from "../../models/notificationModel.js";
import Reviews from "../../models/reviewsModel.js";

const mockUserId = new mongoose.Types.ObjectId();
let mongoServer;

// --- Setup In-Memory MongoDB ---
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (!mongoose.connection.readyState) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// --- Mock Auth Middleware ---
app.use((req, res, next) => {
  req.user = { _id: mockUserId };
  next();
});

// --- Tests ---
describe("Notification Controller", () => {
  describe("GET /notifications", () => {
    it("should return notifications with populated sender and review info", async () => {
      const userId = new mongoose.Types.ObjectId();

      const review = await Reviews.create({
        reviewText: "Great product!",
        mediaReview: [],
        rating: 5,
        userId,
        comments: [
          { comment: "Nice!", userId, replies: [{ reply: "Thank you!", userId }] }
        ]
      });

      await Notification.create({
        recipient: mockUserId,
        sender: userId,
        reviewId: review._id,
        commentId: review.comments[0]._id,
        replyId: review.comments[0].replies[0]._id,
        isRead: false,
        type: "comment" // Must match enum in your Notification schema
      });

      const res = await request(app).get("/notifications");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.notifications).toHaveLength(1);

      const notif = res.body.notifications[0];
      expect(notif).toHaveProperty("commentText", "Nice!");
      expect(notif).toHaveProperty("replyText", "Thank you!");
      expect(notif).toHaveProperty("sender");
      expect(notif).toHaveProperty("reviewId");
    });

    it("should handle notifications without comments or replies", async () => {
      const userId = new mongoose.Types.ObjectId();

      const review = await Reviews.create({
        reviewText: "Test review",
        mediaReview: [],
        rating: 4,
        userId
      });

      await Notification.create({
        recipient: mockUserId,
        sender: userId,
        reviewId: review._id,
        isRead: false,
        type: "like" // Must be a valid enum
      });

      const res = await request(app).get("/notifications");
      expect(res.status).toBe(200);
      expect(res.body.notifications[0].commentText).toBeNull();
      expect(res.body.notifications[0].replyText).toBeNull();
    });
  });

  describe("PATCH /notifications/:id/read", () => {
    it("should mark a notification as read", async () => {
      const notification = await Notification.create({
        recipient: mockUserId,
        sender: new mongoose.Types.ObjectId(),
        reviewId: new mongoose.Types.ObjectId(),
        isRead: false,
        type: "comment" // valid enum
      });

      const res = await request(app).patch(`/notifications/${notification._id}/read`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.notification.isRead).toBe(true);
    });

    it("should return 404 for invalid notification id", async () => {
      const res = await request(app).patch("/notifications/000000000000000000000000/read");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message");
    });
  });
});