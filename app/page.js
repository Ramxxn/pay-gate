import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#fafafa] text-neutral-900">
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">

          {/* Left Content */}
          <div className="max-w-xl">

            {/* Small eyebrow */}
            <div className="mb-7 flex items-center gap-3 text-sm font-medium text-neutral-500">
              <span className="h-px w-8 bg-neutral-300" />
              A place for creators
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-950 sm:text-6xl lg:text-[4.25rem]">
              A little support
              <br />
              can{" "}
              <span className="text-neutral-400">
                go a long way.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-lg text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
              Create your own page, share what you do, and let your
              community support you with a simple contribution.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">

              <Link
                href="/sign-up"
                className="group inline-flex items-center gap-2 rounded-md bg-purple-900 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg"
              >
                Create your page
              </Link>

              <Link
                href="/creator"
                className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
              >
                Explore creators
              </Link>

            </div>

            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">

              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-[#fafafa] bg-neutral-200" />
                <div className="h-8 w-8 rounded-full border-2 border-[#fafafa] bg-neutral-300" />
                <div className="h-8 w-8 rounded-full border-2 border-[#fafafa] bg-neutral-400" />
                <div className="h-8 w-8 rounded-full border-2 border-[#fafafa] bg-neutral-500" />
              </div>

              <div className="h-4 w-px bg-neutral-200" />

              <p className="text-sm text-neutral-500">
                Built for people who create
                <span className="ml-1 text-neutral-900">with purpose.</span>
              </p>

            </div>
          </div>

          {/* Right Hero Image Grid — unchanged */}
          <div className="grid h-125 grid-cols-2 grid-rows-5 gap-3">

            <div className="row-span-5 overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src="/images/ui/secure-paygate-1.jpg"
                alt="Creator"
                width={600}
                height={1000}
                priority
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="row-span-2 overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src="/images/ui/secure-paygate-2.jpg"
                alt="Creator"
                width={600}
                height={500}
                priority
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="row-span-3 overflow-hidden rounded-3xl bg-neutral-100">
              <Image
                src="/images/ui/secure-paygate-3.jpg"
                alt="Creator"
                width={600}
                height={700}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}