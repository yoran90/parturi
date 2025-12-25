import { jest } from "@jest/globals";

import { savePrice, getPrices, deletePrice } from "../../controllers/priceController.js";
import Price from "../../models/PriceModel.js";





const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Price Controller - savePrice", () => {
  test("should return 400 if no prices provided", async () => {
    const req = { body: {} };
    const res = mockRes();

    await savePrice(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "No prices provided." });
  });

  test("should create new price if not exists", async () => {
    const priceData = { title: "Haircut", amount: 20 };

    Price.findOne = jest.fn().mockResolvedValue(null);
    Price.prototype.save = jest.fn().mockResolvedValue(priceData);

    const req = { body: { prices: [priceData] } };
    const res = mockRes();

    await savePrice(req, res);

    expect(Price.findOne).toHaveBeenCalledWith({ title: "Haircut" });
    expect(Price.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Prices saved successfully ✅",
      prices: [priceData],
    });
  });


   test("should update price if exists", async () => {
    const priceData = { title: "Haircut", amount: 25 };

    Price.findOne = jest.fn().mockResolvedValue({ _id: "123" });
    Price.findByIdAndUpdate = jest.fn().mockResolvedValue(priceData);

    const req = { body: { prices: [priceData] } };
    const res = mockRes();

    await savePrice(req, res);

    expect(Price.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      priceData,
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("should return 500 on error", async () => {
    Price.findOne = jest.fn().mockRejectedValue(new Error("DB error"));

    const req = { body: { prices: [{ title: "Test" }] } };
    const res = mockRes();

    await savePrice(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });
});

//! Get all prices
describe("Price Controller - getPrices", () => {

  test("should return all prices", async () => {
    const mockPrices = [
      { title: "Haircut", amount: 20 },
      { title: "Shave", amount: 10 },
    ];

    Price.find = jest.fn().mockResolvedValue(mockPrices);

    const req = {};
    const res = mockRes();

    await getPrices(req, res);

    expect(Price.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPrices);
  });

  test("should return 500 on error", async () => {
    Price.find = jest.fn().mockRejectedValue(new Error("DB error"));

    const req = {};
    const res = mockRes();

    await getPrices(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});


//! delete price
describe("Price Controller - deletePrice", () => {

  test("should delete price successfully", async () => {
    const mockPrice = { _id: "123", title: "Haircut", amount: 20 };
    Price.findByIdAndDelete = jest.fn().mockResolvedValue(mockPrice);

    const req = { params: { id: "123" } };
    const res = mockRes();

    await deletePrice(req, res);

    expect(Price.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Price deleted successfully",
      deletedPrice: mockPrice,
    });
  });

  test("should return 404 if price not found", async () => {
    Price.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = { params: { id: "999" } };
    const res = mockRes();

    await deletePrice(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Price not found",
    });
  });

  test("should return 500 on error", async () => {
    Price.findByIdAndDelete = jest.fn().mockRejectedValue(new Error("DB error"));

    const req = { params: { id: "123" } };
    const res = mockRes();

    await deletePrice(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "DB error",
    });
  });

});

