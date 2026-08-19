import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";


// GET dashboard data
export async function GET() {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const user = await User.findById(session.user.id).select(
            "-password -razorpay.secret"
        );

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Dashboard GET Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch dashboard data",
            },
            { status: 500 }
        );
    }
}




// UPDATE dashboard data
export async function PATCH(request) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const body = await request.json();

        const {
            userName,
            email,
            razorpayKeyId,
            razorpaySecret,
        } = body;

        const user = await User.findById(session.user.id);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // Update username
        if (userName !== undefined) {
            user.userName = userName;
        }

        // Update email
        if (email !== undefined) {
            user.email = email;
        }

        // Update Razorpay Key ID
        if (razorpayKeyId !== undefined) {
            user.razorpay.keyId = razorpayKeyId;
        }

        // Update Razorpay Secret
        if (razorpaySecret !== undefined) {
            user.razorpay.secret = razorpaySecret;
        }

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Dashboard updated successfully",
        });
    } catch (error) {
        console.error("Dashboard PATCH Error:", error);

        // Handle duplicate username/email
        if (error.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Username or email already exists",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update dashboard",
            },
            { status: 500 }
        );
    }
}