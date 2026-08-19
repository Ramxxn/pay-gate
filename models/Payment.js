import mongoose, { Schema } from "mongoose";

const PaymentSchema = new Schema(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    donorName: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Anonymous",
    },

    donorEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    message: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    // Amount in smallest currency unit
    // Example: ₹100 = 10000 paise
    amount: {
      type: Number,
      required: true,
      min: 100,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    // Razorpay Order
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Razorpay Payment
    razorpayPaymentId: {
      type: String,
      default: null,
      index: true,
    },

    // Razorpay signature
    razorpaySignature: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "paid",
        "failed",
        "refunded",
      ],
      default: "created",
      index: true,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    refundedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);