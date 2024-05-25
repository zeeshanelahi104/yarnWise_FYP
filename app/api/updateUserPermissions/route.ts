// api/updateUserPermissions.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export const POST = async (request: NextRequest) => {
    try {
        await connectDB();
        const { userId, permissions } = await request.json();
        // Update user permissions in the database
        const userWithUpdatedPermissions = await User.findByIdAndUpdate(userId, { permissions });
        return NextResponse.json({
            success: true,
            status: 200,
            message: "User permissions updated successfully",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            status: 500,
            error: "Internal Server Error",
        }, { status: 500 });
    }
};
