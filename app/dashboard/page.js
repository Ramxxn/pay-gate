"use client";

import React, { useEffect, useState } from "react";
import {
    User,
    Image,
    Upload,
    Save,
    X,
    Loader2,
} from "lucide-react";

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);

    const [profilePreview, setProfilePreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        razorpayKeyId: "",
        razorpaySecret: "",
    });

    // =========================
    // GET DASHBOARD DATA
    // =========================
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch("/api/dashboard", {
                    method: "GET",
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch dashboard");
                }

                const user = data.user;

                setFormData({
                    userName: user.userName || "",
                    email: user.email || "",
                    razorpayKeyId: user.razorpay?.keyId || "",
                    razorpaySecret: "",
                });

                setProfilePreview(user.avatar?.url || null);
                setCoverPreview(user.coverImage?.url || null);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    // =========================
    // INPUT CHANGE
    // =========================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =========================
    // IMAGE UPLOAD
    // =========================
    const uploadImage = async (file, type) => {
        if (!file) return;

        const data = new FormData();

        data.append("file", file);
        data.append("type", type);

        try {
            const response = await fetch("/api/cloudinary/upload", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Image upload failed");
            }

            return result;
        } catch (error) {
            console.error(`${type} upload error:`, error);
            throw error;
        }
    };

    // =========================
    // PROFILE IMAGE
    // =========================
    const handleProfilePhoto = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setProfilePhoto(file);

        const preview = URL.createObjectURL(file);
        setProfilePreview(preview);

        try {
            await uploadImage(file, "avatar");
        } catch (error) {
            alert("Profile photo upload failed.");
        }
    };

    // =========================
    // COVER IMAGE
    // =========================
    const handleCoverPhoto = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setCoverPhoto(file);

        const preview = URL.createObjectURL(file);
        setCoverPreview(preview);

        try {
            await uploadImage(file, "cover");
        } catch (error) {
            alert("Cover photo upload failed.");
        }
    };

    // =========================
    // SAVE DASHBOARD
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const response = await fetch("/api/dashboard", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: formData.userName,
                    email: formData.email,
                    razorpayKeyId: formData.razorpayKeyId,
                    razorpaySecret: formData.razorpaySecret,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to update dashboard"
                );
            }

            alert("Dashboard updated successfully.");

            // Don't keep secret in frontend state
            setFormData((prev) => ({
                ...prev,
                razorpaySecret: "",
            }));
        } catch (error) {
            console.error("Dashboard update error:", error);

            alert(
                error.message || "Something went wrong while saving."
            );
        } finally {
            setSaving(false);
        }
    };

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-2 inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                        Creator Dashboard
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Your Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your profile and Razorpay payment details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ================= PROFILE ================= */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Profile Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                This information will be displayed on your donation page.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* Username */}
                            <div>
                                <label
                                    htmlFor="userName"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>

                                <div className="flex overflow-hidden rounded-xl border border-gray-300 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
                                    <span className="flex items-center bg-gray-50 px-3 text-sm text-gray-500">
                                        /
                                    </span>

                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        required
                                        className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ================= IMAGES ================= */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Profile Images
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add a profile photo and cover image for your public page.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            {/* Profile Photo */}
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Profile Photo
                                </label>

                                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-purple-400 hover:bg-purple-50">

                                    {profilePreview ? (
                                        <img
                                            src={profilePreview}
                                            alt="Profile preview"
                                            className="mb-3 h-24 w-24 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                            <User className="h-8 w-8" />
                                        </div>
                                    )}

                                    <span className="text-sm font-medium text-gray-700">
                                        {profilePhoto
                                            ? profilePhoto.name
                                            : "Click to upload profile photo"}
                                    </span>

                                    <span className="mt-1 text-xs text-gray-400">
                                        PNG, JPG or WEBP
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={handleProfilePhoto}
                                    />
                                </label>
                            </div>

                            {/* Cover Photo */}
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">
                                    Cover Picture
                                </label>

                                <label className="group flex min-h-47.5 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 text-center transition hover:border-purple-400 hover:bg-purple-50">

                                    {coverPreview ? (
                                        <img
                                            src={coverPreview}
                                            alt="Cover preview"
                                            className="h-full min-h-47.5 w-full object-cover"
                                        />
                                    ) : (
                                        <>
                                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                                                <Image className="h-8 w-8" />
                                            </div>

                                            <span className="text-sm font-medium text-gray-700">
                                                Click to upload cover picture
                                            </span>

                                            <span className="mt-1 text-xs text-gray-400">
                                                Recommended: 1500 × 500px
                                            </span>
                                        </>
                                    )}

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={handleCoverPhoto}
                                    />
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* ================= RAZORPAY ================= */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="mb-6">
                            <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
                                    ₹
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Razorpay Configuration
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Connect your Razorpay account to receive donations.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">

                            {/* Razorpay Key */}
                            <div>
                                <label
                                    htmlFor="razorpayKeyId"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Razorpay Key ID
                                </label>

                                <input
                                    id="razorpayKeyId"
                                    name="razorpayKeyId"
                                    type="text"
                                    value={formData.razorpayKeyId}
                                    onChange={handleChange}
                                    placeholder="rzp_live_xxxxxxxxxxxxx"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                />
                            </div>

                            {/* Razorpay Secret */}
                            <div>
                                <label
                                    htmlFor="razorpaySecret"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Razorpay Secret
                                </label>

                                <input
                                    id="razorpaySecret"
                                    name="razorpaySecret"
                                    type="password"
                                    value={formData.razorpaySecret}
                                    onChange={handleChange}
                                    placeholder="Enter your Razorpay secret"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 font-mono text-sm outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                />

                                <p className="mt-2 text-xs text-gray-400">
                                    Leave empty if you don't want to change your existing secret.
                                </p>
                            </div>

                            <div className="rounded-xl bg-purple-50 p-4 text-sm text-purple-800">
                                <strong>Important:</strong>{" "}
                                Your Razorpay secret is only sent to your
                                backend. Never expose it in client-side code.
                            </div>
                        </div>
                    </section>

                    {/* ================= SAVE ================= */}
                    <div className="flex items-center justify-end gap-3 pb-8">

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            <X className="h-4 w-4" />
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Page;