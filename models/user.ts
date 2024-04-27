

import mongoose, {Schema } from 'mongoose';

const createUserSchema = new Schema(
  {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, required: true },
  permissions: { type: Object, require: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const users = mongoose.models.users || mongoose.model("users", createUserSchema)

export default users;
