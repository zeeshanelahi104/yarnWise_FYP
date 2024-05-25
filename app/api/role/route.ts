// pages/api/patients.js
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import Role from '@/models/role';

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const role = await Role.find({});
    return NextResponse.json({
      success: true,
      status: 200,
      role
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
    const newRole = await Role.create(req);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "Role Created",
      data: newRole
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
