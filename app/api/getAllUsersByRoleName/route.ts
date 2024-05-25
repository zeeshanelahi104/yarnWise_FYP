
import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user';

export const POST = async (request: NextRequest) => {
    try {
      await connectDB();
      const req = await request.json();
      const users = await User.find({role: req?.role})
      return NextResponse.json({
        success: true,
        status: 200,
        users
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({
        success: false,
        status: 500,
        error: "Internal Server Error"
      }, {status:500},);
    }
  };

