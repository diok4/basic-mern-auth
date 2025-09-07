import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  isAccountVerified: { type: Boolean, default: true },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;
