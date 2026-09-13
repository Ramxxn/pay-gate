import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/db";
import User from "@/models/User";

export default async function CreatorsPage() {
  await connectDB();

  const creators = await User.find({})
    .select("userName name avatar bio")
    .sort({ createdAt: -1 })
    .lean();
  return (
    <main className="min-h-screen bg-[#f7f7f8]">
      {/* Hero Image Section */}
      <section className="relative h-[280px] w-full overflow-hidden bg-neutral-900 sm:h-[360px] lg:h-[420px]">
        <Image
          src="/images/ui/creator-hero.jpg"
          alt="Support creators"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Simple dark overlay - no gradient */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-2xl text-white">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80">
              Creator Community
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Support the people you love
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
              Discover creators, explore their work, and support them
              directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Creator Area */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* LEFT - Creator Explorer */}
          <div className="flex h-[520px] min-w-0 flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-sm">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Creators
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Find someone to support
                </p>
              </div>

              <div className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                {creators.length} creators
              </div>
            </div>

            {/* Scrollable Creator Grid */}
            <div className="min-h-0 flex-1 overflow-auto p-6">
              {creators.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                      <span className="text-xl">✦</span>
                    </div>

                    <p className="font-medium text-neutral-800">
                      No creators yet
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      Creators will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid min-w-[420px] grid-cols-4 gap-x-5 gap-y-7 sm:grid-cols-5">
                  {creators.map((creator) => {
                    const displayName =
                      creator.name || creator.userName || "Creator";

                    const initial = displayName
                      .charAt(0)
                      .toUpperCase();

                    return (
                      <Link
                        key={creator._id.toString()}
                        href={`/creator/@${creator.userName}`}
                        className="group flex min-w-0 flex-col items-center text-center"
                      >
                        {/* Avatar */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white bg-neutral-100 shadow-sm ring-1 ring-black/[0.08] transition duration-200 group-hover:scale-105 group-hover:ring-purple-300 sm:h-20 sm:w-20">
                          {creator.avatar ? (
                            <Image
                              src={creator.avatar.url}
                              alt={displayName}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-xl font-semibold text-neutral-500">
                              {initial}
                            </div>
                          )}
                        </div>

                        {/* Username */}
                        <span className="mt-3 w-full truncate px-1 text-xs font-medium text-neutral-700 transition group-hover:text-purple-700 sm:text-sm">
                          @{creator.userName}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - Featured Image Section */}
          <div className="relative h-[520px] overflow-hidden rounded-3xl bg-neutral-900 shadow-sm">
            <Image
              src="/images/ui/creator-main.jpg"
              alt="Support independent creators"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Simple overlay */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-9">
              <div className="max-w-md">
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  Direct support
                </span>

                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Your support makes their work possible.
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/80 sm:text-base">
                  Choose a creator from the list and support them directly.
                  Every contribution helps creators keep doing what they love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}