import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: String,
    newsletter: Boolean,
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);