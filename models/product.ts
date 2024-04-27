// server/models/user.ts

import mongoose, {Schema } from 'mongoose';


const createProductSchema = new Schema(
    {
  name: { type: String, required: true },
  brand: { type: String, required: true },
  count: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
},
{
    timestamps: true,
  });

  const products = mongoose.models.products || mongoose.model("products", createProductSchema)

  export default products;
