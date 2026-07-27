import Link from "next/link";
import { blogs } from "@/data/blogs";

export default function TechnicalBlogsPage() {
  // Filter technical blogs only
  const technicalBlogs = blogs
    .filter((blog) => blog.category === "technical")
    .sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Technical Blogs
      </h1>

      <p className="text-gray-600 mb-8">
        In-depth technical insights on PIR, PUF, polyols, and polymer insulation systems.
      </p>

      {/* BLOG LIST */}
      <div className="space-y-5">
        {technicalBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/technical/${blog.slug}`}
            className="block p-6 border rounded-lg hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  {blog.summary}
                </p>
              </div>

              <span className="text-xs text-gray-500 whitespace-nowrap">
                {blog.publishedAt}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}