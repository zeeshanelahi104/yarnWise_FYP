// pages/api/Broker.js
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import Broker from '@/models/broker';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const broker = await Broker.find({});
    return NextResponse.json({
      success: true,
      status: 200,
      broker
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
    const newBroker = await Broker.create(req);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Broker Created",
      data: newBroker
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
