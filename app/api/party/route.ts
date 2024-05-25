// pages/api/party.js
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import Party from '@/models/party';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const party = await Party.find({});
    return NextResponse.json({
      success: true,
      status: 200,
      party
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
    const newparty = await Party.create(req);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Party Created",
      data: newparty
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
