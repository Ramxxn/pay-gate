import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
    try {
        const result = await cloudinary.api.ping();

        return NextResponse.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("CLOUDINARY PING ERROR:", error);

        return NextResponse.json({
            success: false,
            message: error.message,
            http_code: error.http_code,
        });
    }
}