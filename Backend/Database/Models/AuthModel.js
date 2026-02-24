import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const AuthSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMpwSm-uUSFz3Pr-5bRMszy7iSw3WkBuzhvw&s",
    },
  },
  { timestamps: true }
);

AuthSchema.pre("save", async function () {
    if (!this.isModified("password")) return; // password not changed
    this.password = await bcrypt.hash(this.password, 10);
  });

const authModel = mongoose.model("users_table", AuthSchema);

export default authModel;
