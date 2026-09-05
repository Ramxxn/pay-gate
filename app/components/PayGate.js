"use client";

import api from "@/lib/api";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = ({user}) => {

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


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
          console.log("Payment successful:", response);
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



  // Dummy supporters
  const supporters = [
    {
      name: "Rahul",
      amount: 50,
      message: "Keep doing awesome work ❤️",
    },
    {
      name: "Ankit",
      amount: 100,
      message: "Love your content 🔥",
    },
    {
      name: "Priya",
      amount: 20,
      message: "Have a chai ☕",
    },
    {
      name: "Rohit",
      amount: 200,
      message: "Best wishes for your journey.",
    },
  ];

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

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left */}

          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7">

              <h2 className="mb-6 text-2xl font-semibold">
                Recent Supporters
              </h2>

              <div className="space-y-5">

                {supporters.map((supporter, index) => (

                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-2xl bg-zinc-800/60 py-2 px-4"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold">
                      {supporter.name.charAt(0)}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <h3 className="font-semibold">
                          {supporter.name}
                        </h3>

                        <span className="font-bold text-purple-400">
                          ₹{supporter.amount}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-zinc-400">
                        {supporter.message}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="sticky top-6 rounded-3xl border border-zinc-800 bg-zinc-900 px-4 py-2">

              <h2 className="text-2xl font-semibold">
                Support {user?.userName}
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Help me continue creating amazing things.
              </p>

              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-950 text-sm px-4 py-3 outline-none focus:border-purple-500"
              />

              <textarea
                placeholder="Leave a message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={4}
                className="mt-3 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-purple-500"
              />

              <div className="mt-5 grid grid-cols-2 gap-3">

                <button onClick={() => setAmount(10)} className="rounded-full border border-purple-600 py-2.5 font-sm hover:bg-purple-700">
                  ₹10
                </button>

                <button onClick={() => setAmount(20)} className="rounded-full border border-purple-600 py-2.5 font-sm hover:bg-purple-700">
                  ₹20
                </button>

                <button onClick={() => setAmount(50)} className="rounded-full border border-purple-600 py-2.5 font-sm hover:bg-purple-700">
                  ₹50
                </button>

                <button onClick={() => setAmount(100)} className="rounded-full border border-purple-600 py-2.5 font-sm hover:bg-purple-700">
                  ₹100
                </button>

              </div>

              <button onClick={handlePayment} disabled={loading} className="mt-6 w-full rounded-xl border border-purple-100 bg-purple-500 py-3 text-lg font-semibold transition hover:scale-95">
                {loading ? "Processing..." : `Pay ₹${amount || ""}`}
              </button>

              <div className="mt-8 border-t border-zinc-800 pt-6 text-center">

                <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3.5 mb-2 py-2">

                  <Image
                    src="/images/razorpay-icon.png"
                    width={28}
                    height={28}
                    alt="razorpay"
                    className="bg-none"
                  />

                  <span className="text-sm text-zinc-900">
                    Powered by Razorpay
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Page;