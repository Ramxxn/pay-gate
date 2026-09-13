"use client";

import api from "@/lib/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [donorName, setDonorName] = useState("");
  const [supporters, setSupporters] = useState([]);

  const handlePayment = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const order = await api("/api/razorpay/create-order", {
        method: "POST",
        body: {
          amount: Number(amount),
          message,
          donorName,
          recipientId: user._id,
        },
      });

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: user?.userName,
        description: `Support ${user?.userName}`,
        order_id: order.orderId,

        handler: (response) => {
          console.log("Payment successful:", response);

          toast.success(
            `Thank you for supporting @${user?.userName}!`,
            {
              duration: 4000,
            }
          );

          setAmount("");
          setMessage("");
          setDonorName("");

          // Refresh supporters after successful payment
          getDonorInfo();
        },

        prefill: {
          name: donorName || "",
          email: "",
        },

        theme: {
          color: "#7c3aed",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("Payment system is not available");
        return;
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response.error);

        toast.error(
          response.error?.description || "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getDonorInfo = async () => {
    try {
      const data = await api(`/api/payments/${user._id}`, {
        method: "GET",
      });

      setSupporters(data.payments || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load supporters");
    }
  };

  useEffect(() => {
    getDonorInfo();
  }, [user?._id]);

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900">

      {/* Cover */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={user?.coverImage?.url || "/images/coverwing.jpg"}
          alt="cover"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Profile */}
      <div className="relative -mt-20 flex flex-col items-center">

        <div className="relative h-40 w-40 overflow-hidden rounded-full border-8 border-white bg-neutral-100 shadow-md">
          <Image
            src={user?.avatar?.url || "/images/avatarwing.com"}
            fill
            sizes="160px"
            alt={`${user?.userName || "Creator"} profile`}
            className="object-cover"
          />
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-950">
          @{user?.userName}
        </h1>

      </div>

      {/* Main */}
      <div className="mx-auto mt-14 max-w-7xl px-6 pb-16">

        <div className="grid items-stretch gap-8 lg:grid-cols-3">

          {/* Left */}
          <div className="h-full lg:col-span-2">
            <div className="h-full rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">

              <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Recent Supporters
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  People who have supported this creator.
                </p>
              </div>

              {/* Scrollable supporters */}
              <div className="max-h-88 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">

                {supporters.length === 0 ? (
                  <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
                    <div className="text-center">
                      <p className="text-sm font-medium text-neutral-700">
                        No supporters yet
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        Be the first person to support @{user?.userName}.
                      </p>
                    </div>
                  </div>
                ) : (
                  supporters.map((supporter) => {
                    const name = supporter.donorName || "Anonymous";
                    const initial = name.charAt(0).toUpperCase();

                    return (
                      <div
                        key={supporter._id}
                        className="flex items-center gap-3 border-b border-neutral-100 py-3 last:border-0"
                      >
                        {/* Avatar */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 ring-1 ring-neutral-200">
                          {initial}
                        </div>

                        {/* Name + Message */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-neutral-900">
                              {name}
                            </h3>

                            <span className="truncate text-xs text-neutral-400">
                              supported @{user?.userName}
                            </span>
                          </div>

                          {supporter.message && (
                            <p className="mt-0.5 truncate text-sm text-neutral-500">
                              {supporter.message}
                            </p>
                          )}
                        </div>

                        {/* Amount */}
                        <span className="shrink-0 text-sm font-semibold text-neutral-800">
                          ₹{supporter.amount / 100}
                        </span>
                      </div>
                    );
                  })
                )}

              </div>

            </div>
          </div>

          {/* Right */}
          <div>
            <div className="sticky top-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                  Support @{user?.userName}
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Leave a tip and a message.
                </p>
              </div>

              {/* Donor name */}
              <input
                type="text"
                placeholder="Your name (optional)"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                maxLength={100}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
              />

              {/* Amount */}
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                className="mt-2.5 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
              />

              {/* Message */}
              <textarea
                placeholder="Say something nice... (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={3}
                className="mt-2.5 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
              />

              {/* Quick amounts */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[10, 20, 50, 100].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className={`rounded-lg border py-2 text-sm font-medium transition ${Number(amount) === value
                        ? "border-purple-300 bg-purple-50 text-purple-700"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                      }`}
                  >
                    ₹{value}
                  </button>
                ))}
              </div>

              {/* Pay */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="mt-4 w-full rounded-xl bg-neutral-900 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : `Pay ${amount ? `₹${amount}` : "now"}`}
              </button>

              {/* Razorpay */}
              <div className="mt-5 flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2.5">
                <Image
                  src="/images/razorpay-icon.png"
                  width={24}
                  height={24}
                  alt="Razorpay"
                />

                <span className="text-xs font-medium text-neutral-500">
                  Secure payment with Razorpay
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Page;