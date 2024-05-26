// server/models/transaction.ts

import mongoose, { Schema } from "mongoose";

const createTransactionSchema = new Schema(
    {
        productName: { type: String, required: true },
        productCount: { type: String, required: true },
        brandName: { type: String, required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalBill: { type: Number  },
        partyName: { type: String, required: true },
        partyArea: { type: String, required: true },
        brokerName: { type: String, required: true },
        brokerCommissionPercentage: { type: Number, required: true },
        transactionType: { type: String, required: true },
        credit: { type: Number, required: true },
        debit: { type: Number},
        balance: { type: Number },
        status: { type: String},
      },
  {
    timestamps: true,
  }
);

const transactions =
  mongoose.models.transactions ||
  mongoose.model("transactions", createTransactionSchema);

export default transactions;
