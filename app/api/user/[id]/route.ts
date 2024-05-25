import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user"

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const userId = params?.id ? new ObjectId(params.id) : null;

    const query = userId ? { _id: userId } : {};

    let user = await User.findOne(query);

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found!!!"
      }, { status: 404});
    }

    await user.deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "User Deleted"
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
    const userId = params?.id ? new ObjectId(params.id) : null;
    const query = userId ? { _id: userId } : {};

    let user = await User.findOne(query);

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found!!!"
      }, {status: 404});
    }

    await User.updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "User Updated",
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
    const userId = params?.id ? new ObjectId(params.id) : null;

    const query = userId ? { _id: userId } : {};

    let user = await User.findOne(query);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      user
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
