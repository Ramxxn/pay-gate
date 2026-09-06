import { notFound } from "next/navigation";
import User from "@/models/User";
import connectDB from "@/lib/db";
import PayGate from "@/app/components/PayGate";

export default async function Page({ params }) {
  const { username } = await params;

  const rawUsername = decodeURIComponent(username);

  if (!rawUsername.startsWith("@")) {
    notFound();
  }
  const userName = rawUsername.slice(1);
  await connectDB();
  const user = await User.findOne({ userName }).lean();

  if (!user) {
    notFound();
  }

  return <PayGate user={JSON.parse(JSON.stringify(user))} />;
}