import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
        const { userName, email, password } = await req.json();

        if (!userName || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        await connectDB()

        const userExist = await User.findOne({ email })

        if (userExist) {
            return NextResponse.json(
                { error: "User already exist" },
                { status: 409 }
            )
        }

        const userNameExist = await User.findOne({ userName });

        if (userNameExist) {
            return NextResponse.json(
                { error: "Please use a unique username" },
                { status: 409 }
            );
        }

        const user = await User.create({ userName, email, password })

        return NextResponse.json(
            { message: "User registered successfully", user },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }

}