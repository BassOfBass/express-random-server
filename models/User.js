import mongoose from "mongoose";
import { returnAbsoluteHREF } from "../utils/absoluteURL.js";

const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

userSchema.virtual("url").get(function() {
  const url = returnAbsoluteHREF(`/users/${this._id}`);
  return url;
});

const User = model("User", userSchema);

export default User;