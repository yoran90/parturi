import mongoose from "mongoose";
import crypto from "crypto";


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

  // Add reset password token and expired for change password feature
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},

  // Verify email token and verified field for verify email feature
  emailVerificationToken: {type: String},
  emailVerificationExpires: {type: Date},
  isEmailVerified: {
    type: Boolean,
    default: false,
  }

}, { timestamps: true });

//! Method to generate password reset token
authSchema.methods.generatePasswordReset = function () {
  const ersetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(ersetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; 
  return ersetToken;
};
//! Method to generate email verification token
authSchema.methods.generateEmailVerificationToken  = function () {
  const verifyToken = crypto.randomBytes(20).toString("hex");

  this.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  this.emailVerificationExpires = Date.now() + 30 * 60 * 1000; 
  return verifyToken;
}

const Auth = mongoose.model("Auth", authSchema);
export default Auth;