import mongoose from "mongoose";

const PriceSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  service: {
    type: String, 
    required: true,
  },
});

const Price = mongoose.model("Price", PriceSchema);
export default Price;
