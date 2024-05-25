import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Party from '@/models/party';

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const partyId = params?.id ? new ObjectId(params.id) : null;

    const query = partyId ? { _id: partyId } : {};

    let party = await Party.findOne(query);

    if (!party) {
      return NextResponse.json({
        success: false,
        error: "Party not found!!!"
      }, { status: 404});
    }

    await Party.deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Party Deleted"
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
    const partyId = params?.id ? new ObjectId(params.id) : null;

    const query = partyId ? { _id: partyId } : {};

    let party = await Party.findOne(query);

    if (!party) {
      return NextResponse.json({
        success: false,
        error: "Party not found!!!"
      }, {status: 404});
    }

    await Party.updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Party Updated",
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
  try {
    const db = await connectDB();
    const partyId = params?.id ? new ObjectId(params.id) : null;

    const query = partyId ? { _id: partyId } : {};

    let party = await Party.findOne(query);

    if (!party) {
      return NextResponse.json({
        success: false,
        error: "Party not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      party
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
