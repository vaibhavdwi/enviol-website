import Link from "next/link";
import { blogs } from "@/data/blogs";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function GeneralBlogsPage() {

  const generalBlogs = [...blogs]
    .filter((blog) => blog.category === "general")
    .sort(
      (a, b) =>
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
    );

  const latestBlogs = [...generalBlogs]
    .slice(0, 10);

  return (
    <main className="bg-yellow-50 min-h-screen">

      {/* HERO */}

      <section className="pt-20 pb-10 border-b">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <AnimatedHeading
            title="General Articles"
          />

          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Explore industry insights, sustainability initiatives,
            recycling innovations, circular economy, low-carbon
            manufacturing, ESG, market trends and responsible
            industrial development.
          </p>

        </div>

      </section>

      {/* CONTENT */}

      <section className="py-12">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-10">

          {/* BLOG LIST */}

          <div className="lg:col-span-3 space-y-8">

            {generalBlogs.length === 0 ? (

              <div className="bg-white border rounded-xl p-8 shadow-sm">
                <p className="text-gray-500">
                  No general blogs available yet.
                </p>
              </div>

            ) : (

              generalBlogs.map((blog) => (

                <div
                  key={blog.slug}
                  className="bg-white border rounded-xl p-8 shadow-sm hover:shadow-lg transition"
                >

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">

                    <span>
                      {blog.publishedAt}
                    </span>

                    <span>
                      By {blog.author}
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold mb-4 text-primary">

                    {blog.title}

                  </h2>

                  <p className="text-gray-700 mb-6">

                    {blog.summary}

                  </p>

                  <Link
                    href={`/blog/general/${blog.slug}`}
                    className="font-semibold text-[#55BAAE]"
                  >
                    Read More →
                  </Link>

                </div>

              ))

            )}

          </div>

          {/* SIDEBAR */}

          <aside>

            <div className="bg-white border rounded-xl p-6 sticky top-24">

              <h3 className="text-xl font-bold mb-5">
                Latest General Articles
              </h3>

              <div className="space-y-4">

                {latestBlogs.map((blog) => (

                  <Link
                    key={blog.slug}
                    href={`/blog/general/${blog.slug}`}
                    className="block border-b pb-3 hover:text-[#55BAAE] transition"
                  >

                    <div className="font-medium">
                      {blog.title}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                      {blog.publishedAt}
                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}