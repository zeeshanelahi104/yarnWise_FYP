import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Broker from '@/models/broker';

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const brokerId = params?.id ? new ObjectId(params.id) : null;

    const query = brokerId ? { _id: brokerId } : {};

    let broker = await Broker.findOne(query);

    if (!broker) {
      return NextResponse.json({
        success: false,
        error: "Broker not found!!!"
      }, { status: 404});
    }

    await broker.deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Broker Deleted"
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectDB();
    const req = await request.json();
    const brokerId = params?.id ? new ObjectId(params.id) : null;

    const query = brokerId ? { _id: brokerId } : {};

    let broker = await Broker.findOne(query);

    if (!broker) {
      return NextResponse.json({
        success: false,
        error: "Broker not found!!!"
      }, {status: 404});
    }

    await Broker.updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Broker Updated",
      appointment: req
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const db = await connectDB();
    const brokerId = params?.id ? new ObjectId(params.id) : null;

    const query = brokerId ? { _id: brokerId } : {};

    let broker = await Broker.findOne(query);

    if (!broker) {
      return NextResponse.json({
        success: false,
        error: "Broker not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      broker
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
