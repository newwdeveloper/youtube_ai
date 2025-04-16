import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // email must be entered
    unique: true, // no two users can have same email
    validate: {
      validator: function (value) {
        // checks if email is valid
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true, // password must be entered
    validate: {
      validator: function (value) {
        // checks if password has 1 letter, 1 number, and at least 6 characters
        return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value);
      },
      message:
        "Password must be at least 6 characters and contain at least 1 letter and 1 number",
    },
  },
  name: String,
});

// Pre-save hook to hash password after validation
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export default mongoose.model("User", UserSchema);
