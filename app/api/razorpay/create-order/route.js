import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/lib/db";
import User from "@/models/User";


// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

export async function POST(req) {
    try {
        const { amount, message, donorName, recipientId } = await req.json();

        if (!amount || Number(amount) < 1) {
            return NextResponse.json(
                { error: "Valid amount is required" },
                { status: 400 }
            );
        }

        if (!recipientId) {
            return NextResponse.json(
                { error: "Recipient is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findById(recipientId);

        if (!user) {
            return NextResponse.json(
                { error: "Recipient not found" },
                { status: 404 }
            );
        }

        // Get Razorpay credentials from user document
        const keyId = user.razorpay?.keyId;
        const secret = user.razorpay?.secret;

        if (!keyId || !secret) {
            return NextResponse.json(
                { error: "Razorpay credentials are not configured for this user" },
                { status: 400 }
            );
        }


        // Create Razorpay instance dynamically
        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: secret,
        });

        const order = await razorpay.orders.create({
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        const payment = await Payment.create({
            recipient: user._id,
            donorName: donorName?.trim() || "Anonymous",
            message: message || "",
            amount: order.amount,
            currency: order.currency,
            razorpayOrderId: order.id,
            status: "created",
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentId: payment._id,
            keyId: keyId,
        });

    } catch (error) {
        console.error("Razorpay order error:", error);

        return NextResponse.json(
            { error: "Failed to create Razorpay order" },
            { status: 500 }
        );
    }
}