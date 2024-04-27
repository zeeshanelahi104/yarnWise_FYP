// server/models/transaction.ts

import mongoose, { Schema } from "mongoose";

const createTransactionSchema = new Schema(
    {
        productName: { type: String, required: true },
        productCount: { type: String, required: true },
        brandName: { type: String, required: true },
        unitPrice: { type: String, required: true },
        quantity: { type: Number, required: true },
        totalBill: { type: String  },
        partyName: { type: String, required: true },
        partyArea: { type: String, required: true },
        partyContactNumber: { type: String, required: true },
        brokerName: { type: String, required: true },
        brokerCommissionPercentage: { type: String, required: true },
        paymentType: { type: String, required: true },
        transactionType: { type: String, required: true },
      },
  {
    timestamps: true,
  }
);

const transactions =
  mongoose.models.transactions ||
  mongoose.model("transactions", createTransactionSchema);

export default transactions;
