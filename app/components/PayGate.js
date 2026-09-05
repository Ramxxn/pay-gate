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
        description: "Support / My Gate Amount",
        order_id: order.orderId,

        handler: (response) => {
          toast.success("Payment successful! Thankyou for you're Support");
        },

        prefill: {
          name: "",
          email: "",
        },

        theme: {
          color: "#a855f7",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Cover */}
      <div className="relative h-72 w-full">
        <Image
          src="/images/coverwing.jpg"
          alt="cover"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Profile */}
      <div className="relative flex flex-col items-center -mt-20">

        <Image
          src={user?.avatar?.url || "/images/avatarwing.com"}
          width={160}
          height={160}
          alt="profile"
          className="rounded-full border-8 border-zinc-100 object-cover"
        />

        <h1 className="mt-4 text-3xl font-bold">
          {user?.userName}
        </h1>

      </div>

      {/* Main */}
      <div className="mx-auto mt-14 max-w-7xl px-6 pb-16">

        <div className="grid items-stretch gap-8 lg:grid-cols-3">

          {/* Left */}

          <div className="lg:col-span-2 h-full">
            <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 p-7">

              <h2 className="mb-6 text-2xl font-semibold">
                Recent Supporters
              </h2>

              {/* Scrollable supporters */}
              <div className="max-h-88 overflow-y-auto pr-8 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">

                {supporters.map((supporter) => {
                  const name = supporter.donorName || "Anonymous";
                  const initial = name.charAt(0).toUpperCase();

                  return (
                    <div
                      key={supporter._id}
                      className="flex items-center gap-3 border-b border-zinc-800 py-3 last:border-0"
                    >
                      {/* Avatar */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-semibold">
                        {initial}
                      </div>

                      {/* Name + Message */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">
                            {name}
                          </h3>

                          <span className="text-xs text-zinc-500">
                            supported {user?.userName}
                          </span>
                        </div>

                        {supporter.message && (
                          <p className="mt-0.5 truncate text-sm text-zinc-400">
                            {supporter.message}
                          </p>
                        )}
                      </div>

                      {/* Amount */}
                      <span className="shrink-0 text-sm font-semibold text-purple-400">
                        ₹{supporter.amount / 100}
                      </span>
                    </div>
                  );
                })}

              </div>

            </div>
          </div>

          {/* Right */}

          <div>
            <div className="sticky top-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

              {/* Header */}
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">
                  Support {user?.userName}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
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
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500"
              />

              {/* Amount */}
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                className="mt-2.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500"
              />

              {/* Message */}
              <textarea
                placeholder="Say something nice... (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={3}
                className="mt-2.5 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-purple-500"
              />

              {/* Quick amounts */}
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[10, 20, 50, 100].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setAmount(value)}
                    className="rounded-lg border border-zinc-800 py-2 text-sm font-medium text-zinc-300 transition hover:border-purple-500 hover:text-white"
                  >
                    ₹{value}
                  </button>
                ))}
              </div>

              {/* Pay */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="mt-4 w-full rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : `Pay ${amount ? `₹${amount}` : "now"}`}
              </button>

              {/* Razorpay */}
              <div className="mt-4 flex items-center justify-center gap-2 border-t border-zinc-800 bg-white rounded-full p-2">
                <Image
                  src="/images/razorpay-icon.png"
                  width={24}
                  height={24}
                  alt="Razorpay"
                />

                <span className="text-xs text-zinc-500">
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