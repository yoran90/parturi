import mongoose from "mongoose";


const headerLogoSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true 
  },
  publicId: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const HeaderLogo = mongoose.model('HeaderLogo', headerLogoSchema);
export default HeaderLogo;