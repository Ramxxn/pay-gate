import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Payment from "@/models/Payment";


export async function GET(req, { params }) {
    try {
        const { recipientId } = await params;

        await connectDB();

        const payments = await Payment.find({
            recipient: recipientId,
            status: "created",
        }).sort({ amount: -1, paidAt: -1 })
            .limit(20)
            .select("donorName message amount currency paidAt")
            .lean();

        return NextResponse.json({
            success: true,
            payments,
        });
    } catch (error) {
        console.error("Get supporters error:", error);

        return NextResponse.json(
            { error: "Failed to fetch supporters" },
            { status: 500 }
        );
    }
}