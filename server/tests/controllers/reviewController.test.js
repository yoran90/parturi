import { describe, jest } from "@jest/globals";




jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: {
    uploader: {
      destroy: jest.fn(),
      upload: jest.fn(), 
    },
  },
}));



jest.unstable_mockModule("../../models/reviewsModel.js", () => ({
  default: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const cloudinary = (await import("../../config/cloudinary.js")).default;
const Reviews = (await import("../../models/reviewsModel.js")).default;
const { 
  createReview, getReviews, getReviewById, getOwnReviews, deleteReviewByUser, userUpdateOwnReview, getReviewByIdAndDelete, createComments, getComments, createLike, createReply
} = await import("../../controllers/reviewsController.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};


//! create reviwes
describe("Review Controller - createReview", () => {
  it("should return 400 if review text is too short", async () => {
    const req = {
      body: { reviewText: "bad", rating: 4 },
      user: { id: "1" },
    };
    const res = mockRes();

    await createReview(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review text must be at least 5 characters long",
    });
  });

  it("should return 400 if all fields are missing", async () => {
    const req = {
      body: {},
      user: { id: "1" },
    };
    const res = mockRes();

    await createReview(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "All fields are required",
    });
  });


  it("should create review without media", async () => {
    const req = {
      body: { reviewText: "Great service!", rating: 5 },
      user: {
        id: "1",
        email: "test@mail.com",
        firstName: "John",
        lastName: "Doe",
        profileImage: null,
        gender: "male",
      },
    };
    const res = mockRes();

    Reviews.create.mockResolvedValue({ reviewText: "Great service!" });

    await createReview(req, res);

    expect(Reviews.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review added successfully",
      review: expect.any(Object),
    });
  });


  it("should create review with media upload", async () => {
    const req = {
      body: { reviewText: "Amazing!", rating: 5 },
      file: {
        path: "file-path",
        mimetype: "image/jpeg",
      },
      user: {
        id: "1",
        email: "test@mail.com",
        firstName: "John",
        lastName: "Doe",
        profileImage: null,
        gender: "male",
      },
    };
    const res = mockRes();

    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "img-url",
      public_id: "img-id",
    });

    Reviews.create.mockResolvedValue({ reviewText: "Amazing!" });

    await createReview(req, res);

    expect(cloudinary.uploader.upload).toHaveBeenCalled();
    expect(Reviews.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });


  it("should return 500 on error", async () => {
    const req = {
      body: { reviewText: "Great service!", rating: 5 },
      user: { id: "1" },
    };
    const res = mockRes();

    Reviews.create.mockRejectedValue(new Error("DB error"));

    await createReview(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});


//! get reviwes
describe("Reviews Controller - getReviews", () => {

  it("should return all reviews sorted by date", async () => {
    const req = { query: {} };
    const res = mockRes();

    const mockReviews = [
      { reviewText: "Great!", createdAt: new Date() },
      { reviewText: "Nice!", createdAt: new Date() },
    ];

    Reviews.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockReviews),
    });

    await getReviews(req, res);

    expect(Reviews.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockReviews);
  });

  it("should return limited number of reviews when limit is provided", async () => {
    const req = { query: { limit: "1" } };
    const res = mockRes();

    const mockReviews = [
      { reviewText: "First" },
      { reviewText: "Second" },
    ];

    Reviews.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([...mockReviews]),
    });

    await getReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { reviewText: "First" },
    ]);
  });

  it("should return empty array if no reviews exist", async () => {
    const req = { query: {} };
    const res = mockRes();

    Reviews.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([]),
    });

    await getReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return 500 on database error", async () => {
    const req = { query: {} };
    const res = mockRes();

    Reviews.find.mockImplementation(() => {
      throw new Error("DB error");
    });

    await getReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});


//! get review by id 
describe("Reviews Controller - getReviewById", () => {

  it("should return review by id", async () => {
    const req = { params: { id: "123" } };
    const res = mockRes();

    const fakeReview = {
      _id: "123",
      reviewText: "Great service",
      rating: 5,
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await getReviewById(req, res);

    expect(Reviews.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeReview);
  });

  it("should return 404 if review not found", async () => {
    const req = { params: { id: "123" } };
    const res = mockRes();

    Reviews.findById.mockResolvedValue(null);

    await getReviewById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review not found",
    });
  });

  it("should return 500 on database error", async () => {
    const req = { params: { id: "123" } };
    const res = mockRes();

    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await getReviewById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });
});


//! user get all own review
describe("Reviews Controller - getOwnReviews", () => {

  it("should return user's own reviews", async () => {
    const req = {
      user: { _id: "user123" },
    };
    const res = mockRes();

    const fakeReviews = [
      { reviewText: "Nice service", rating: 5 },
      { reviewText: "Good barber", rating: 4 },
    ];

    Reviews.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(fakeReviews),
    });

    await getOwnReviews(req, res);

    expect(Reviews.find).toHaveBeenCalledWith({ userId: "user123" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeReviews);
  });

  it("should return 404 if no reviews found", async () => {
    const req = {
      user: { _id: "user123" },
    };
    const res = mockRes();

    Reviews.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });

    await getOwnReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Reviews not found",
    });
  });

  it("should return 500 on database error", async () => {
    const req = {
      user: { _id: "user123" },
    };
    const res = mockRes();

    Reviews.find.mockImplementation(() => {
      throw new Error("DB error");
    });

    await getOwnReviews(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});

//! user delete own review
describe("Reviews Controller - deleteReviewByUser", () => {

  it("should delete review and related media successfully", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
    };
    const res = mockRes();

    const fakeReview = {
      _id: "review123",
      userId: "user123",
      mediaReview: {
        type: "image",
        publicId: "review-img-id",
      },
      comments: [
        {
          imageComment: { public_id: "comment-img-id" },
          imageReply: { publicId: "reply-img-id" },
          replies: [],
        },
      ],
    };

    Reviews.findById.mockResolvedValue(fakeReview);
    Reviews.findByIdAndDelete.mockResolvedValue(fakeReview);
    cloudinary.uploader.destroy.mockResolvedValue({});

    await deleteReviewByUser(req, res);

    expect(Reviews.findById).toHaveBeenCalledWith("review123");
    expect(cloudinary.uploader.destroy).toHaveBeenCalledTimes(3);
    expect(Reviews.findByIdAndDelete).toHaveBeenCalledWith("review123");

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review deleted successfully",
    });
  });

  it("should return 404 if review not found", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
    };
    const res = mockRes();

    Reviews.findById.mockResolvedValue(null);

    await deleteReviewByUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review not found",
    });
  });

  it("should return 403 if user is not owner of review", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
    };
    const res = mockRes();

    Reviews.findById.mockResolvedValue({
      userId: "anotherUser",
    });

    await deleteReviewByUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden",
    });
  });

  it("should return 500 on database error", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
    };
    const res = mockRes();

    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await deleteReviewByUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});



//! user update own review
describe("Reviews Controller - userUpdateOwnReview", () => {

  it("should update review text and rating successfully", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
      body: {
        reviewText: "Updated review text",
        rating: 4,
      },
    };
    const res = mockRes();

    const saveMock = jest.fn().mockResolvedValue(true);

    const fakeReview = {
      _id: "review123",
      userId: "user123",
      reviewText: "Old text",
      rating: 2,
      save: saveMock,
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await userUpdateOwnReview(req, res);

    expect(fakeReview.reviewText).toBe("Updated review text");
    expect(fakeReview.rating).toBe(4);
    expect(saveMock).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review updated successfully",
      review: fakeReview,
    });
  });

  it("should update review media if file is uploaded", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
      body: {},
      file: {
        mimetype: "image/png",
        path: "image-path",
      },
    };
    const res = mockRes();

    const saveMock = jest.fn().mockResolvedValue(true);

    const fakeReview = {
      _id: "review123",
      userId: "user123",
      mediaReview: {
        publicId: "old-media-id",
      },
      save: saveMock,
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    cloudinary.uploader.destroy.mockResolvedValue({});
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "new-url",
      public_id: "new-id",
    });

    await userUpdateOwnReview(req, res);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith("old-media-id");
    expect(cloudinary.uploader.upload).toHaveBeenCalled();
    expect(fakeReview.mediaReview).toEqual({
      type: "image",
      url: "new-url",
      publicId: "new-id",
    });

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 404 if review not found", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
      body: {},
    };
    const res = mockRes();

    Reviews.findById.mockResolvedValue(null);

    await userUpdateOwnReview(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review not found",
    });
  });

  it("should return 403 if user is not the owner", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
      body: {},
    };
    const res = mockRes();

    Reviews.findById.mockResolvedValue({
      userId: "anotherUser",
    });

    await userUpdateOwnReview(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden",
    });
  });

  it("should return 500 on error", async () => {
    const req = {
      params: { id: "review123" },
      user: { id: "user123" },
      body: {},
    };
    const res = mockRes();

    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await userUpdateOwnReview(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});


//! admin get review by id and delete
describe("Reviews Controller - getReviewByIdAndDelete (Admin)", () => {

  it("should delete review and all related images successfully", async () => {
    const req = { params: { id: "review123" } };
    const res = mockRes();

    const fakeReview = {
      _id: "review123",
      mediaReview: {
        type: "image",
        publicId: "review-img-id",
      },
      comments: [
        {
          imageComment: { public_id: "comment-img-id" },
          replies: [
            {
              imageReply: { publicId: "reply-img-id" },
              replies: [],
            },
          ],
        },
      ],
    };

    Reviews.findById.mockResolvedValue(fakeReview);
    Reviews.findByIdAndDelete.mockResolvedValue(fakeReview);
    cloudinary.uploader.destroy.mockResolvedValue({});

    await getReviewByIdAndDelete(req, res);

   expect(Reviews.findById).toHaveBeenCalledWith("review123");

    const destroyedIds = cloudinary.uploader.destroy.mock.calls.map(call => call[0]);
    expect(destroyedIds).toEqual(
      expect.arrayContaining(["review-img-id", "comment-img-id", "reply-img-id"])
    );


    expect(Reviews.findByIdAndDelete).toHaveBeenCalledWith("review123");
    expect(res.status).toHaveBeenCalledWith(200);

  });

  it("should return 404 if review not found", async () => {
    const req = { params: { id: "review123" } };
    const res = mockRes();

    Reviews.findById.mockResolvedValue(null);

    await getReviewByIdAndDelete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Review not found",
    });
  });

  it("should return 500 on database error", async () => {
    const req = { params: { id: "review123" } };
    const res = mockRes();

    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await getReviewByIdAndDelete(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});


//! create comments
describe("Reviews Controller - createComments", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { reviewId: "review123" },
      body: { comment: "This is a test comment" },
      user: {
        _id: "user123",
        email: "test@example.com",
        firstName: "John",
        lastName: "Doe",
        profileImage: { url: "profile.jpg" },
        gender: "male"
      },
      file: null 
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should return 404 if review not found", async () => {
    Reviews.findById.mockResolvedValue(null);

    await createComments(req, res);

    expect(Reviews.findById).toHaveBeenCalledWith("review123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Review not found" });
  });

  it("should add comment successfully without image", async () => {
    const fakeReview = { comments: [], save: jest.fn().mockResolvedValue(true) };
    Reviews.findById.mockResolvedValue(fakeReview);

    await createComments(req, res);

    expect(fakeReview.comments.length).toBe(1);
    expect(fakeReview.comments[0].comment).toBe("This is a test comment");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: "Comment added successfully",
      comment: expect.any(Array)
    }));
  });

  it("should add comment with image", async () => {
    req.file = { path: "fake-path.jpg" };
    const fakeReview = { comments: [], save: jest.fn().mockResolvedValue(true) };
    Reviews.findById.mockResolvedValue(fakeReview);
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "http://cloudinary.com/fake.jpg",
      public_id: "cloud123"
    });

    await createComments(req, res);

    expect(cloudinary.uploader.upload).toHaveBeenCalledWith("fake-path.jpg", { folder: "paturi" });
    expect(fakeReview.comments[0].imageComment).toEqual({
      url: "http://cloudinary.com/fake.jpg",
      public_id: "cloud123"
    });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should handle errors and return 500", async () => {
    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await createComments(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});

//! get comments 
describe("Reviews Controller - getComments", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { reviewId: "review123" },
      query: { limit: "2" } 
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should return 404 if review not found", async () => {
    // Mock the chained populate to return null
    const populateMock = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(null)
    });
    Reviews.findById.mockReturnValue({ populate: populateMock });

    await getComments(req, res);

    expect(Reviews.findById).toHaveBeenCalledWith("review123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Comment not found" });
  });

  it("should return comments with limit", async () => {
    const fakeReview = {
      comments: [
        { comment: "Comment 1" },
        { comment: "Comment 2" },
        { comment: "Comment 3" }
      ]
    };

    // Mock chained populate calls
    const populateMock = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(fakeReview)
    });
    Reviews.findById.mockReturnValue({ populate: populateMock });

    await getComments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      comments: fakeReview.comments.slice(0, 2) // limited by req.query.limit
    });
  });

  it("should return all comments if no limit", async () => {
    req.query.limit = undefined; // no limit

    const fakeReview = {
      comments: [
        { comment: "Comment 1" },
        { comment: "Comment 2" },
      ]
    };

    // Mock chained populate
    const populateMock = jest.fn().mockReturnValue({
      populate: jest.fn().mockResolvedValue(fakeReview)
    });
    Reviews.findById.mockReturnValue({ populate: populateMock });

    await getComments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      comments: fakeReview.comments
    });
  });

  it("should handle errors and return 500", async () => {
    const populateMock = jest.fn().mockReturnValue({
      populate: jest.fn().mockRejectedValue(new Error("DB error"))
    });
    Reviews.findById.mockReturnValue({ populate: populateMock });

    await getComments(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

});


//! create like
describe("Reviews Controller - createLike", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { reviewId: "review123" },
      user: {
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        profileImage: { url: "image.jpg" },
        gender: "male"
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should add a like if user hasn't liked yet", async () => {
    const fakeReview = {
      likes: { count: 0, likedBy: [] },
      save: jest.fn().mockResolvedValue(true)
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await createLike(req, res);

    expect(Reviews.findById).toHaveBeenCalledWith("review123");
    expect(fakeReview.likes.likedBy.length).toBe(1);
    expect(fakeReview.likes.count).toBe(1);
    expect(fakeReview.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Like added successfully",
      likes: fakeReview.likes
    });
  });

  it("should remove a like if user already liked", async () => {
    const fakeReview = {
      likes: { count: 1, likedBy: [{ userId: "user123" }] },
      save: jest.fn().mockResolvedValue(true)
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await createLike(req, res);

    expect(fakeReview.likes.likedBy.length).toBe(0);
    expect(fakeReview.likes.count).toBe(0);
    expect(fakeReview.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return 404 if review not found", async () => {
    Reviews.findById.mockResolvedValue(null);

    await createLike(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Review not found" });
  });

  it("should handle errors and return 500", async () => {
    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await createLike(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});


//! CREATE REPLY (supports nested replies)
describe("Reviews Controller - createReply", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { reviewId: "review123", commentId: "comment123" },
      body: { reply: "This is a reply" },
      user: {
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        profileImage: { url: "image.jpg" },
        gender: "male",
      },
      file: null
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  it("should add a reply to an existing comment", async () => {
    const fakeReview = {
      comments: [
        { _id: "comment123", replies: [] }
      ],
      save: jest.fn().mockResolvedValue(true)
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await createReply(req, res);

    expect(fakeReview.comments[0].replies.length).toBe(1);
    expect(fakeReview.comments[0].replies[0].reply).toBe("This is a reply");
    expect(fakeReview.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Reply added successfully",
      review: fakeReview
    });
  });

  it("should return 404 if review not found", async () => {
    Reviews.findById.mockResolvedValue(null);

    await createReply(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Review not found" });
  });

  it("should return 404 if comment not found", async () => {
    const fakeReview = {
      comments: [{ _id: "otherComment", replies: [] }],
      save: jest.fn()
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await createReply(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Comment not found" });
    expect(fakeReview.save).not.toHaveBeenCalled();
  });

  it("should handle file upload for imageReply", async () => {
    req.file = { path: "fakepath/image.jpg" };

    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: "uploaded.jpg",
      public_id: "img123"
    });

    const fakeReview = {
      comments: [{ _id: "comment123", replies: [] }],
      save: jest.fn().mockResolvedValue(true)
    };

    Reviews.findById.mockResolvedValue(fakeReview);

    await createReply(req, res);

    expect(fakeReview.comments[0].replies[0].imageReply).toEqual({
      url: "uploaded.jpg",
      publicId: "img123"
    });
    expect(fakeReview.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should handle errors and return 500", async () => {
    Reviews.findById.mockRejectedValue(new Error("DB error"));

    await createReply(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});
