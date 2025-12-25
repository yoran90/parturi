import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../models/titleForPageModel.js", () => ({
  default: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
}));

const { addTitleForPage, getTitleForPage, updateTitleForPage } = await import("../../controllers/titleForPageController.js");
const TitleForPage = (await import("../../models/titleForPageModel.js")).default;

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn();
  return res;
};

//! add title for page
describe("Title For Page Controller - addTitleForPage", () => {
  test("should add title for page successfully", async () => {
    const req = {
      body: {
        serviceTitle: "Service",
        serviceDescription: "Service Desc",
        galleriTitle: "Gallery",
        galleriDescription: "Gallery Desc",
        productTitle: "Product",
        productDescription: "Product Desc",
        footerTitle: "Footer",
        footerDescription: "Footer Desc",
        footerFooter: "Footer Text",
        connectionTitle: "Connect",
        connectionDescription: "Connect Desc"
      },
    };
    const res = mockRes();

    const mockTitle = {
      save: jest.fn().mockResolvedValue(true),
    };

    TitleForPage.create.mockResolvedValue(mockTitle);

    await addTitleForPage(req, res);

    expect(TitleForPage.create).toHaveBeenCalledWith(req.body);
    expect(mockTitle.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Title for page added successfully",
      saveTitleForPage: true,
    });
  });

  test("should return 500 on error", async () => {
    const req = { body: {} };
    const res = mockRes();

    TitleForPage.create.mockRejectedValue(new Error("DB error"));

    await addTitleForPage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });
});

//! get title for page 
test("should return the title for page successfully", async () => {
  const req = {};
  const res = mockRes();

  const fakeTitle = {
    serviceTitle: "Service",
    galleriTitle: "Gallery",
    productTitle: "Product",
  };

  TitleForPage.findOne.mockResolvedValue(fakeTitle);

  await getTitleForPage(req, res);

  expect(TitleForPage.findOne).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ titleForPage: fakeTitle });
});


//! update title for page
describe("Title For Page Controller - updateTitleForPage", () => {


  test("should update title for page successfully", async () => {
    const req = {
      body: {
        serviceTitle: "New Service",
        productTitle: "New Product",
      }
    };
    const res = mockRes();

    const existingTitle = {
      serviceTitle: "Old Service",
      productTitle: "Old Product",
      save: jest.fn().mockResolvedValue({
        serviceTitle: "New Service",
        productTitle: "New Product"
      })
    };

    TitleForPage.findOne.mockResolvedValue(existingTitle);

    await updateTitleForPage(req, res);

    expect(TitleForPage.findOne).toHaveBeenCalled();
    expect(existingTitle.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Updated successfully ✅",
      updatedTitleForPage: {
        serviceTitle: "New Service",
        productTitle: "New Product"
      }
    });
  });


  test("should return 404 if title for page not found", async () => {
    const req = { body: {} };
    const res = mockRes();

    TitleForPage.findOne.mockResolvedValue(null);

    await updateTitleForPage(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Title for page not found" });
  });


  test("should return 500 on error", async () => {
    const req = { body: {} };
    const res = mockRes();

    TitleForPage.findOne.mockRejectedValue(new Error("DB error"));

    await updateTitleForPage(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });


});