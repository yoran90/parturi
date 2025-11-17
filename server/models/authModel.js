import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  }
}, { timestamps: true });

const Auth = mongoose.model("Auth", authSchema);
export default Auth;