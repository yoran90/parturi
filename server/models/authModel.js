import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
  favoriteName: {
    type: String,
    default: "Favorite name",
  },
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
    url: {
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
  },
  bio: {
    type: String,
    default: "Not bio yet",
  },
  addressOne: {
    type: String,
    default: "Not address yet",
  },
  addressTwo: {
    type: String,
    default: "Not address yet",
  },
  country: {
    type: String,
    default: "Not country yet",
  },
  city: {
    type: String,
    default: "Not city yet",
  },
  postalCode: {
    type: String,
    default: "Not postal code yet",
  },
  phoneNumber: {
    type: String,
    default: "Not phone number yet",
  },
  notes: {
    type: String,
    default: "Not notes yet",
  },
  timezone: {
    type: String,
    default: "Not timezone yet",
  },

}, { timestamps: true });

const Auth = mongoose.model("Auth", authSchema);
export default Auth;