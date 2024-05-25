import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Inventory from "@/models/inventory"

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const inventoryId = params?.id ? new ObjectId(params.id) : null;

    const query = inventoryId ? { _id: inventoryId } : {};

    let inventory = await Inventory.findOne(query);

    if (!inventory) {
      return NextResponse.json({
        success: false,
        error: "Inventory not found!!!"
      }, { status: 404});
    }

    await Inventory.deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Inventory Deleted"
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
    const inventoryId = params?.id ? new ObjectId(params.id) : null;

    const query = inventoryId ? { _id: inventoryId } : {};

    let inventory = await Inventory.findOne(query);

    if (!inventory) {
      return NextResponse.json({
        success: false,
        error: "Inventory not found!!!"
      }, {status: 404});
    }

    await Inventory.updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Inventory Updated",
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
  console.log("Received PUT request for inventory ID:", params?.id);

  try {
    const db = await connectDB();
    const req = await request.json();
    console.log("Received data:", req);
    const inventoryId = params?.id ? new ObjectId(params.id) : null;

    const query = inventoryId ? { _id: inventoryId } : {};

    let inventory = await Inventory.findOne(query);

    if (!inventory) {
      return NextResponse.json({
        success: false,
        error: "Inventory not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      inventory
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
