import { jest, describe, test, beforeEach, expect } from "@jest/globals";
import Galleri from "../../models/GalleriModel.js";



// Mock Mongoose models
jest.unstable_mockModule("../../models/MediaModel.js", () => ({
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));
jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: {
    uploader: {
      destroy: jest.fn(),
    },
  },
}));

// Mock Cloudinary (if needed)
jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: { uploader: { upload: jest.fn(), destroy: jest.fn() } }
}));

const cloudinary = (await import("../../config/cloudinary.js")).default;
const Media = (await import("../../models/MediaModel.js")).default;
const { uploadMedia, getMediaList, deleteMediaById } = await import("../../controllers/mediaController.js");
const { uploadGalleriImage, getGalleriImages, deleteGalleryImage } = await import("../../controllers/mediaController.js");


const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

//! Upload Media
describe("Media Controller - uploadMedia", () => {

  test("should return 400 if no file uploaded", async () => {
    const req = { file: null, body: {} };
    const res = mockRes();


    await uploadMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "No file uploaded" });

  });

  test("should return 400 if invalid file type", async () => {
    const req = {
      file: { mimetype : "application/pdf", originalname: "file.pdf" },
      body: {}
    };

    const res = mockRes();

    await uploadMedia(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Invalid file type" });
  });

  test("should save media successfully", async () => {
    const mockSave = jest.fn().mockResolvedValue({});
    Media.mockImplementation(() => ({ save: mockSave }));

    const req = {
      file: { mimetype: "image/png", path: "fake-path.jpg", originalname: "image.png", filename: "file123" },
      body: { alt: "Test image" }
    };
    const res = mockRes();

    await uploadMedia(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

});

//! get Media List
describe("Media Controller - getMediaList", () => {

  test("should return media list successfully", async () => {
    const mockMedia = [{ type: "image" }, { type: "video" }];

    Media.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockMedia),
    });

    const req = {};
    const res = mockRes();

    await getMediaList(req, res);

    expect(Media.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockMedia,
    });
  });

  test("should return 500 on error", async () => {
    Media.find = jest.fn().mockImplementation(() => {
      throw new Error("DB error");
    });

    const req = {};
    const res = mockRes();

    await getMediaList(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});



//! delete media by id
describe("Media Controller - deleteMediaById", () => {
  test("should return 404 if media not found", async () => {
    Media.findById = jest.fn().mockResolvedValue(null);

    const req = { params: { id: "123" } };
    const res = mockRes();

    await deleteMediaById(req, res);

    expect(Media.findById).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Media not found",
    });
  });

  test("should delete media successfully", async () => {
 
    const mockMedia = {
      publicId: "test-public-id",   
      type: "image",                
      deleteOne: jest.fn(),
    };


    Media.findById = jest.fn().mockResolvedValue(mockMedia);
    cloudinary.uploader.destroy = jest.fn().mockResolvedValue({});

    const req = { params: { id: "123" } };
    const res = mockRes();

    await deleteMediaById(req, res);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
      "test-public-id",
      { resource_type: "image" }
    );

    expect(mockMedia.deleteOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Media deleted successfully",
    });
  });

  test("should return 500 on error", async () => {
    Media.findById = jest.fn().mockRejectedValue(new Error("DB error"));

    const req = { params: { id: "123" } };
    const res = mockRes();

    await deleteMediaById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });
});

/* upload Galleri */
//! create galleria image
describe("Media Controller - uploadGalleriImage", () => {
  test("should return 400 if no files uploaded", async () => {
    const req = { files: [] };
    const res = mockRes();

    await uploadGalleriImage(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "No files uploaded",
    });
  });

   test("should upload gallery images successfully", async () => {
    const req = {
      files: [
        { path: "image1.jpg", filename: "img1" },
        { path: "image2.jpg", filename: "img2" },
      ],
    };

    Galleri.prototype.save = jest.fn().mockResolvedValue();

    const res = mockRes();

    await uploadGalleriImage(req, res);

    expect(Galleri.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.any(Object),
    });
  });


  test("should return 500 on error", async () => {
    const req = {
      files: [{ path: "image.jpg", filename: "img1" }],
    };

    Galleri.prototype.save = jest.fn().mockRejectedValue(new Error("DB error"));

    const res = mockRes();

    await uploadGalleriImage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });
});


//! get galleri images
describe("Media Controller - getGalleriImages", () => {

  test("should return gallery images with limit", async () => {
    const mockImages = [{ images: [] }];

    Galleri.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(mockImages),
      }),
    });

    const req = { query: { limit: "5" } };
    const res = mockRes();

    await getGalleriImages(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockImages,
    });
  });

  test("should return gallery images without limit", async () => {
    const mockImages = [{ images: [] }];

    Galleri.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(mockImages),
      }),
    });

    const req = { query: {} };
    const res = mockRes();

    await getGalleriImages(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockImages,
    });
  });

  test("should return 500 on error", async () => {
    Galleri.find = jest.fn().mockImplementation(() => {
      throw new Error("DB error");
    });

    const req = { query: {} };
    const res = mockRes();

    await getGalleriImages(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});

//! delete galleri image by id 

describe("Media Controller - deleteGalleryImage", () => {
  test("should return 404 if gallery not found", async () => {
    Galleri.findById = jest.fn().mockResolvedValue(null);

    const req = { body: { galleryId: "1", publicId: "img1" } };
    const res = mockRes();

    await deleteGalleryImage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Gallery not found",
    });
    
  });

  test("should return 404 if image not found in gallery", async () => {
    const gallery = { images: [{ publicId: "img2" }] };

    Galleri.findById = jest.fn().mockResolvedValue(gallery);

    const req = { body: { galleryId: "1", publicId: "img1" } };
    const res = mockRes();

    await deleteGalleryImage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Image not found in gallery",
    });
  });

  test("should delete gallery image successfully", async () => {
    const gallery = {
      images: [{ publicId: "img1" }, { publicId: "img2" }],
      save: jest.fn(),
    };

    Galleri.findById = jest.fn().mockResolvedValue(gallery);
    cloudinary.uploader.destroy = jest.fn().mockResolvedValue({});

    const req = { body: { galleryId: "1", publicId: "img1" } };
    const res = mockRes();

    await deleteGalleryImage(req, res);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith("img1");
    expect(gallery.save).toHaveBeenCalled();
    expect(gallery.images).toEqual([{ publicId: "img2" }]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Gallery image deleted successfully",
    });
  });

  test("should return 500 on error", async () => {
    Galleri.findById = jest.fn().mockRejectedValue(new Error("DB error"));

    const req = { body: { galleryId: "1", publicId: "img1" } };
    const res = mockRes();

    await deleteGalleryImage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "DB error",
    });
  });

});