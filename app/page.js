export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white text-gray-900">

      <section className="relative overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-purple-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
              Support the people you love (don't)
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
              A little support can
              <span className="text-purple-600"> go a long way.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Create your own page, share what you do, and let your community
              support you with a simple contribution.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/sign-up"
                className="rounded-xl bg-purple-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
              >
                Create your page
              </a>

              <a
                href="/explore"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Explore creators
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-200" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-300" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-400" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-500" />
              </div>

              <span>Join creators building something they love.</span>
            </div>
          </div>

        </div>
      </section>


    </main>
  );
}