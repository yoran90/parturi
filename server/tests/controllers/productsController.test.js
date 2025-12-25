import { jest } from "@jest/globals";

jest.unstable_mockModule("../../models/ProductsModel.js", () => ({
  default: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),  
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

jest.unstable_mockModule("../../config/cloudinary.js", () => ({
  default: {
    uploader: {
      destroy: jest.fn(),
    },
  },
}));




const { addProducts, getAllProducts, getProductById, deleteProductBYId, updateProductById } = await import("../../controllers/productsController.js");
const Product = (await import("../../models/ProductsModel.js")).default;
const cloudinary = (await import("../../config/cloudinary.js")).default;






const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};


beforeEach(() => {
  jest.clearAllMocks();
});



//! create product
describe("Products Controller - addProducts", () => {

  test("should return 400 if no images uploaded", async () => {
    const req = {
      body: { title: "Test", description: "Desc", price: 100 },
      files: []
    };
    const res = mockRes();

    await addProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "No product images uploaded",
    });
  });

  test("should create product successfully", async () => {
    const mockSavedProduct = {
      _id: "1",
      title: "Test",
    };

    const mockProduct = {
      save: jest.fn().mockResolvedValue(mockSavedProduct),
    };

    Product.create.mockResolvedValue(mockProduct);

    const req = {
      body: { title: "Test", description: "Desc", price: 100, discount: 10 },
      files: [
        { path: "img1.jpg", filename: "img1" },
        { path: "img2.jpg", filename: "img2" },
      ],
    };

    const res = mockRes();

    await addProducts(req, res);

    expect(Product.create).toHaveBeenCalled();
    expect(mockProduct.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product added successfully ✅",
      product: mockSavedProduct,
    });
  });


  test("should return 500 on error", async () => {
    Product.create.mockRejectedValue(new Error("DB error"));

    const req = {
      body: { title: "Test" },
      files: [{ path: "img.jpg", filename: "img" }],
    };

    const res = mockRes();

    await addProducts(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});


//! get all products 
it("should return all products", async () => {
  const req = { query: { limit: "2" } };
  const res = mockRes();

  Product.find.mockReturnValue({
    sort: jest.fn().mockReturnValue({
      limit: jest.fn().mockResolvedValue([
        { title: "P1" },
        { title: "P2" }
      ])
    })
  });

  await getAllProducts(req, res);

  expect(Product.find).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith([
    { title: "P1" },
    { title: "P2" }
  ]);
});


//! get product by id
it("should return product by id", async () => {
  const req = { params: { id: "123" } };
  const res = mockRes();

  const fakeProduct = { title: "Test Product" };

  Product.findById.mockResolvedValue(fakeProduct);

  await getProductById(req, res);

  expect(Product.findById).toHaveBeenCalledWith("123");
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(fakeProduct);
});


//! update producta by id
it("should return 404 if product not found", async () => {
  const req = { params: { id: "123" }, body: {} };
  const res = mockRes();

  Product.findById.mockResolvedValue(null);

  await updateProductById(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
});


it("should update product and manage images correctly", async () => {
  const req = {
    params: { id: "123" },
    body: {
      title: "Updated title",
      description: "Updated desc",
      price: 100,
      discount: 10,
      existingImages: JSON.stringify(["old-url-1"]),
    },
    files: [
      {
        path: "new-img-url",
        filename: "new-public-id",
      },
    ],
  };

  const res = mockRes();

  const existingProduct = {
    _id: "123",
    images: [
      { url: "old-url-1", publicId: "old-id-1" },
      { url: "old-url-2", publicId: "old-id-2" },
    ],
  };

  Product.findById.mockResolvedValue(existingProduct);
  Product.findByIdAndUpdate.mockResolvedValue({
    ...existingProduct,
    title: "Updated title",
  });

  cloudinary.uploader.destroy.mockResolvedValue({});

  await updateProductById(req, res);

  // old-url-2 should be deleted
  expect(cloudinary.uploader.destroy).toHaveBeenCalledWith("old-id-2");
  

  expect(Product.findByIdAndUpdate).toHaveBeenCalled();

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: "Product updated successfully ✅",
    product: expect.any(Object),
  });
});




it("should return 500 on error", async () => {
  const req = { params: { id: "123" }, body: {} };
  const res = mockRes();

  Product.findById.mockRejectedValue(new Error("DB error"));

  await updateProductById(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});




//! delelete product by id
it("should delete product and images successfully", async () => {
  const req = { params: { id: "123" } };
  const res = mockRes();

  const fakeProduct = {
    _id: "123",
    images: [
      { publicId: "img-1" },
      { publicId: "img-2" },
    ],
  };

  Product.findById.mockResolvedValue(fakeProduct);
  Product.findByIdAndDelete.mockResolvedValue(fakeProduct);
  cloudinary.uploader.destroy.mockResolvedValue({});

  await deleteProductBYId(req, res);

  expect(Product.findById).toHaveBeenCalledWith("123");
  expect(cloudinary.uploader.destroy).toHaveBeenCalledTimes(2);
  expect(Product.findByIdAndDelete).toHaveBeenCalledWith("123");

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: "Product deleted successfully ✅",
    product: fakeProduct,
  });
});

it("should return 404 if product not found", async () => {
  const req = { params: { id: "123" } };
  const res = mockRes();

  Product.findById.mockResolvedValue(null);

  await deleteProductBYId(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
});

it("should return 500 on error", async () => {
  const req = { params: { id: "123" } };
  const res = mockRes();

  Product.findById.mockRejectedValue(new Error("DB error"));

  await deleteProductBYId(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

