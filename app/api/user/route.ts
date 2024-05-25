// pages/api/patients.js
import { NextRequest, NextResponse } from 'next/server';
import {connectDB} from '@/lib/db';
import User from '@/models/user';

export const GET = async (request: NextRequest) => {
  // const req2 = await request.json();
  try {
    await connectDB();
    
    // const req = await request.json();
    // console.log("Credentials", req)
  //   let user = null;
  // if(req) {
    // user = await User.find({email: req.email})
  // } else {
    const user = await User.find({});
  // }
    return NextResponse.json({
      success: true,
      status: 200,
      user
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
    const newUser = await User.create(req);
    return NextResponse.json({
      success: true,
      status: 200,
      message: "User Created",
      data: newUser
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
