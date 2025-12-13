import mongoose from "mongoose";


const titleForPageSchema = new mongoose.Schema({
  serviceTitle: {
    type: String,
  },
  serviceDescription: {
    type: String,
  },
  galleriTitle: {
    type: String,
  },
  galleriDescription: {
    type: String,
  },
  productTitle: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  footerTitle: {
    type: String,
  },
  footerDescription: {
    type: String,
  },
  footerFooter: {
    type: String,
  },
  connectionTitle: {
    type: String,
  },
  connectionDescription: {
    type: String,
  },

}, { timestamps: true });

const TitleForPage = mongoose.model("TitleForPage", titleForPageSchema);
export default TitleForPage;