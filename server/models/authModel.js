import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   profileImage: {
    urt: {
      type: String,
      default: null,
    },
    publicId: {
      type: String,
      default: null,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
  }
}, { timestamps: true });

const Auth = mongoose.model("Auth", authSchema);
export default Auth;