import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowecase: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
    },
  },
  { timestaps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
