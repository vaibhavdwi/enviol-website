import Link from "next/link";
import { blogs } from "@/data/blogs";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function BlogPage() {

  const latestBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.publishedAt) -
        new Date(a.publishedAt)
    )
    .slice(0, 10);

  return (
    <main className="bg-yellow-50 min-h-screen">

      {/* HERO */}
      <section className="pt-20 pb-10 border-b">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <AnimatedHeading
            title="Technical Articles & Industry Insights"
          />

          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Explore polyurethane systems, polyester polyols,
            polyether polyols, rigid foam technologies,
            PIR insulation, PUF applications and sustainable
            chemical recycling innovations.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-12">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-10">

          {/* BLOG LIST */}
          <div className="lg:col-span-3 space-y-8">

            {blogs.map((blog) => (

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

                  <span className="capitalize">
                    {blog.category}
                  </span>

                </div>

                <h2 className="text-2xl font-bold mb-4 text-primary">

                  {blog.title}

                </h2>

                <p className="text-gray-700 mb-6">

                  {blog.summary}

                </p>

                <Link
                  href={`/blog/${blog.category}/${blog.slug}`}
                  className="font-semibold text-[#55BAAE]"
                >
                  Read More →
                </Link>

              </div>

            ))}

          </div>

          {/* SIDEBAR */}
          <aside>

            <div className="bg-white border rounded-xl p-6 sticky top-24">

              <h3 className="text-xl font-bold mb-5">
                Latest Articles
              </h3>

              <div className="space-y-4">

                {latestBlogs.map((blog) => (

                  <Link
                    key={blog.slug}
                    href={`/blog/${blog.category}/${blog.slug}`}
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