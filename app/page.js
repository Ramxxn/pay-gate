import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f7f7f8] text-neutral-900">
      <section className="relative overflow-hidden">
        {/* Subtle background accents — no gradients */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-80 w-80 rounded-full bg-purple-50/70 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-12 lg:grid-cols-2 lg:px-8 lg:py-20">
          
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm">
              Support the people you love
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-6xl">
              A little support can
              <span className="text-purple-600"> go a long way.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
              Create your own page, share what you do, and let your community
              support you with a simple contribution.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="rounded-xl bg-purple-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-purple-700 hover:shadow-md"
              >
                Create your page
              </Link>

              <Link
                href="/creator"
                className="rounded-xl border border-neutral-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-neutral-700 shadow-sm transition duration-200 hover:border-neutral-300 hover:bg-neutral-50"
              >
                Explore creators
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-100" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-200" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-300" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-400" />
              </div>

              <span>Join creators building something they love.</span>
            </div>
          </div>

          {/* Right Hero Image Grid */}
          <div className="grid h-125 grid-cols-2 grid-rows-5 gap-3">
            
            <div className="row-span-5 overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src="/images/ui/secure-paygate-1.jpg"
                alt="Creator"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="row-span-2 overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src="/images/ui/secure-paygate-2.jpg"
                alt="Creator"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="row-span-3 overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src="/images/ui/secure-paygate-3.jpg"
                alt="Creator"
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
