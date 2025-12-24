import { jest, describe, expect } from "@jest/globals";



jest.unstable_mockModule("../../models/InformationModel.js", () => ({
  default: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    create: jest.fn(),
  },
}));

const Information = (await import("../../models/InformationModel.js")).default;
const {
  saveInformation,
  getInformation,
} = await import("../../controllers/informationController.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Information Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("saveInformation", () => {

    it("should create new information if none exists", async () => {
      const req = {
        body: {
          title: "Test Title",
          description: "Test Description",
        }
      };

      const res = mockRes();  

      Information.findOne.mockResolvedValue(null);
      Information.create.mockResolvedValue(req.body);

      await saveInformation(req, res);

      expect(Information.findOne).toHaveBeenCalled();
      expect(Information.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Information saved successfully ✅",
        info: req.body
      });
    });


    it("shuold update information if it already exists", async () => {
      const req = {
        body: {
          title: "update information",
        }
      };

      const res = mockRes();

      const existingInfo = { _id: "123" };
      const updatedInfo = { _id: "123", title: "Updated Info" };

      Information.findOne.mockResolvedValue(existingInfo);
      Information.findByIdAndUpdate.mockResolvedValue(updatedInfo);

      await saveInformation(req, res);

      expect(Information.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        req.body,
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Information saved successfully ✅",
        info: updatedInfo
      });
    });

    it("shuold return 500 on error", async () => {
      const req = { body: {} }

      const res = mockRes();

      Information.findOne.mockRejectedValue(new Error("DB error"));

      await saveInformation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "DB error"
      });

    });

  });

});


//! get information
describe("getInformation", () => {
  
  it("shuold get information successfully", async () => {
    const req = {};
    const res = mockRes();


    const info = { title: "Info"};

    Information.findOne.mockResolvedValue(info);

    await getInformation(req, res);

    expect(Information.findOne).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(info);

  });

  it("shuold return 500 on error", async () => {
    const req = {};
    const res = mockRes();

    Information.findOne.mockRejectedValue(new Error("DB error"));

    await getInformation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error"
    });

  });

});
