import { jest, describe, test, beforeEach, expect } from "@jest/globals";

// Mock Mongoose models
jest.unstable_mockModule("../../models/MediaModel.js", () => ({
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

// Mock Cloudinary (if needed)
jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: { uploader: { upload: jest.fn(), destroy: jest.fn() } }
}));

const Media = (await import("../../models/MediaModel.js")).default;
const { uploadMedia } = await import("../../controllers/mediaController.js");


const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


describe("Media Controller - uploadMedia", () => {

  test("should return 400 if no file uploaded", async () => {
    const req = { file: null, body: {} };
    const res = mockRes();


    await uploadMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "No file uploaded" });

  });

});