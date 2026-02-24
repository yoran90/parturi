import { jest } from "@jest/globals";

jest.unstable_mockModule("../../models/shopModel.js", () => {
  class Shop {
    constructor(data) {
      Object.assign(this, data);
    }
    save = jest.fn().mockResolvedValue(true);
  }
  Shop.findOne = jest.fn();
  return { default: Shop };
});


const { getShopMedia, createShopMedia } = await import("../../controllers/shopController.js");
const Shop = (await import("../../models/shopModel.js")).default;


const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};


//! create shop media
it("should create a new shop if none exists", async () => {
  const req = {
    body: { title: "My Shop", description: "Shop Desc" },
    files: [
      { path: "image1.jpg", filename: "img1", mimetype: "image/jpeg" },
      { path: "video1.mp4", filename: "vid1", mimetype: "video/mp4" },
    ],
  };

  const res = mockRes();

  Shop.findOne.mockResolvedValue(null);

  await createShopMedia(req, res);

  expect(Shop.findOne).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Shop media saved successfully",
      shop: expect.objectContaining({
        title: "My Shop",
        description: "Shop Desc",
        media: expect.arrayContaining([
          expect.objectContaining({ type: "image", src: "image1.jpg", publicId: "img1" }),
          expect.objectContaining({ type: "video", src: "video1.mp4", publicId: "vid1" }),
        ]),
      }),
    })
  );
});


it("should update existing shop media and add new files", async () => {
  const req = {
    body: { title: "Updated Shop", existingMedia: JSON.stringify(["oldimg"]) },
    files: [{ path: "newimage.jpg", filename: "newimg", mimetype: "image/jpeg" }],
  };

  const res = mockRes();

  const existingShop = {
    title: "Old Shop",
    description: "Old Desc",
    media: [{ type: "image", src: "old.jpg", publicId: "oldimg" }],
    save: jest.fn().mockResolvedValue(true),
  };

  Shop.findOne.mockResolvedValue(existingShop);

  await createShopMedia(req, res);

  expect(Shop.findOne).toHaveBeenCalled();
  expect(existingShop.save).toHaveBeenCalled();
  expect(existingShop.media.length).toBe(2); // old + new

  expect(existingShop.title).toBe("Updated Shop");

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      message: "Shop media saved successfully",
      shop: expect.objectContaining({ title: "Updated Shop" }),
    })
  );
});


it("should return 500 if something goes wrong", async () => {
  const req = { body: {}, files: [] };
  const res = mockRes();

  Shop.findOne.mockRejectedValue(new Error("DB error"));

  await createShopMedia(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
});



//! get shop
describe("Shop Controller - getShopMedia", () => {
  test("should return shop with both images and videos", async () => {
    const req = {}; 
    const res = mockRes();


    const fakeShop = {
      title: "My Shop",
      description: "Shop description",
      media: [
        { type: "image", src: "img1.jpg", publicId: "img1" },
        { type: "video", src: "video1.mp4", publicId: "vid1" },
      ],
    };

    Shop.findOne.mockResolvedValue(fakeShop);

    await getShopMedia(req, res);

    expect(Shop.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeShop);
  });

  test("should return 404 if shop not found", async () => {
    const req = {};
    const res = mockRes();

    Shop.findOne.mockResolvedValue(null);

    await getShopMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Shop not found" });
  });
});





