// server/models/user.ts

import mongoose, { Document, Schema, ValidatorProps } from 'mongoose';

const createRoleSchema = new Schema(
  {
  role: { type: String },
  permissions: { type: Object, require: true },
},
{
  timestamps: true,
});

const roles =
  mongoose.models.roles ||
  mongoose.model("roles", createRoleSchema);

export default roles;
