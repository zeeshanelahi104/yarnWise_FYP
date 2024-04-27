// server/models/inventory.ts

import mongoose, { Schema } from "mongoose";

const createInventorySchema = new Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    count: { type: String, required: true },
    stock: { type: Number },
  },
  {
    timestamps: true,
  }
);

const inventories =
  mongoose.models.inventories ||
  mongoose.model("inventories", createInventorySchema);

export default inventories;
