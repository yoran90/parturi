import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
  platform: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  }
});

const informationSchema = new mongoose.Schema({
  phone: { 
    type: String 
  },
  email: {
    type: String
  },
  address: { 
    type: String 
  },
  addressUrl: {
    type: String
  },
  addressUrlForMap: {
    type: String
  },
  openingHours: { 
    type: String 
  },
  socialMedia: [socialSchema] 
}, { timestamps: true });

const Information = mongoose.model("Information", informationSchema);

export default Information;
