// pages/api/patients.js
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import Inventory from '@/models/inventory';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const inventory = await Inventory.find({});
    return NextResponse.json({
      success: true,
      status: 200,
      inventory
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
    const newInventory = await Inventory.create(req);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Inventory Created",
      data: newInventory
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
