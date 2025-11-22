import mongoose from "mongoose";

const headerPages = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const HeaderPages = mongoose.model("HeaderPages", headerPages);
export default HeaderPages;