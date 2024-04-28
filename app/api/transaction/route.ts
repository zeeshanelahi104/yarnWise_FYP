// pages/api/transaction.js
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import Transaction from '@/models/transaction';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const transaction = await Transaction.find({});
    return NextResponse.json({
      success: true,
      status: 200,
      transaction
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: "Internal Server Error"
    });
  }
};

export const POST = async (request: NextRequest) => {

  try {
    await connectDB();
    const req = await request.json();
    console.log("Request",req);
    const newTransaction = await Transaction.create(req);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Transaction Created",
      data: newTransaction
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      status: 500,
      error: "Internal Server Error"
    }, {status:500});
  }
};
