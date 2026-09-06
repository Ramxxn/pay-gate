import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const creators = await User.find({})
      .select("userName name profileImage bio")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      creators,
    });
  } catch (error) {
    console.error("Failed to fetch creators:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch creators",
      },
      { status: 500 }
    );
  }
}