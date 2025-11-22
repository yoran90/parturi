import Price from "../models/PriceModel.js";


//! Save price or create price
export const savePrice = async (req, res) => {
  try {
    const { prices } = req.body; 

    if (!prices || !Array.isArray(prices) || prices.length === 0) {
      return res.status(400).json({ message: "No prices provided." });
    }

    const savedPrices = [];

    for (const priceData of prices) {
      const existingPrice = await Price.findOne({ title: priceData.title });
      if (existingPrice) {
        const updatedPrice = await Price.findByIdAndUpdate(existingPrice._id, priceData, { new: true });
        savedPrices.push(updatedPrice);
      } else {
        const newPrice = new Price(priceData);
        const savedPrice = await newPrice.save();
        savedPrices.push(savedPrice);
      }
    }
    res.status(200).json({ message: "Prices saved successfully ✅", prices: savedPrices });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//! Get all prices
export const getPrices = async (req, res) => {
  try {
    const prices = await Price.find();
    res.status(200).json(prices);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! delete price
export const deletePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPrice = await Price.findByIdAndDelete(id);
    if (!deletedPrice) {
      return res.status(404).json({ message: "Price not found" });
    }
    res.status(200).json({ message: "Price deleted successfully", deletedPrice });
  } catch (error) {
    console.log(error);
    
  }
}