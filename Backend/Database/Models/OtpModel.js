import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
    },
    expireAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 min expiry
    },
    purpose: {
      type: String,
      enum: ["signup", "forgot_password"],
      required: true,
    },
  },
  { timestamps: true }
);

// TTL index for automatic deletion after expireAt
otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const otpModel = mongoose.model("otp_table", otpSchema);
export default otpModel;
