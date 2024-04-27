import { connectDB } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import Role from "@/models/role"

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectDB();
    const roleId = params?.id ? new ObjectId(params.id) : null;

    const query = roleId ? { _id: roleId } : {};

    let role = await Role.findOne(query);

    if (!role) {
      return NextResponse.json({
        success: false,
        error: "Role not found!!!"
      }, { status: 404});
    }

    await Role.deleteOne(query);

    return NextResponse.json({
      success: true,
      status: 200,
      error: "Role Deleted"
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
    const roleId = params?.id ? new ObjectId(params.id) : null;

    const query = roleId ? { _id: roleId } : {};

    let role = await Role.findOne(query);

    if (!role) {
      return NextResponse.json({
        success: false,
        error: "Role not found!!!"
      }, {status: 404});
    }

    await Role.updateOne(query, { $set: req });

    return NextResponse.json({
      success: true,
      status: 200,
      message: "Role Updated",
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
    const roleId = params?.id ? new ObjectId(params.id) : null;

    const query = roleId ? { _id: roleId } : {};

    let role = await Role.findOne(query);
    if (!role) {
      return NextResponse.json({
        success: false,
        error: "Role not found!!!"
      }, {status: 404});
    }

    return NextResponse.json({
      success: true,
      status: 200,
      role
    });

  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
};
