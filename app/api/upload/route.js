import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import cloudinary from "@/lib/cloudinary";

import User from "@/models/User";
import connectDB from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  try {

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) { return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); }

    const userId = session.user.id;
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("file");
    const type = formData.get("type");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!["avatar", "cover"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid image type" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Keep reference to old image
    const oldPublicId =
      type === "avatar"
        ? user.avatar?.publicId
        : user.coverImage?.publicId;

    // Convert file to base64 data URI and upload
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "paygate-users",
      resource_type: "image",
    });

    // Save new image in MongoDB
    if (type === "avatar") {
      user.avatar = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } else {
      user.coverImage = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    await user.save();

    // Delete OLD image only after successful upload + DB update
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (deleteError) {
        console.error(
          "Old Cloudinary image deletion failed:",
          deleteError
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `${type} uploaded successfully`,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Image upload failed",
      },
      { status: 500 }
    );
  }
}


