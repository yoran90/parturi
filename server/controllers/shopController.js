import Shop from "../models/shopModel.js";

export const createShopMedia = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}