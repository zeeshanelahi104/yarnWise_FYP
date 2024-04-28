import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Transaction from '@/models/transaction';

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const transactionId = params?.id ? new ObjectId(params.id) : null;

    const query = transactionId ? { _id: transactionId } : {};

    let transaction = await Transaction.findOne(query);

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: "Transaction not found!!!"
      }, { status: 404});
    }

    await Transaction.deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Transaction Deleted"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  console.log("🚀 ~ PUT ~ id:", params?.id)
  try {
    const db = await connectDB();
    const req = await request.json();
    console.log("🚀 ~ PUT ~ req:", req)
    const transactionId = params?.id ? new ObjectId(params.id) : null;

    const query = transactionId ? { _id: transactionId } : {};

    let transaction = await Transaction.findOne(query);

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: "Transaction not found!!!"
      }, {status: 404});
    }

    await Transaction.updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Transaction Updated",
      appointment: req
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  console.log("🚀 ~ GET ~ id:", params.id)
  try {
    const db = await connectDB();
    const transactionId = params?.id ? new ObjectId(params.id) : null;

    const query = transactionId ? { _id: transactionId } : {};

    let transaction = await Transaction.findOne(query);

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: "Transaction not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      transaction
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
