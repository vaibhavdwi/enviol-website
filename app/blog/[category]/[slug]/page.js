import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPost({ params }) {
  const { category, slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "content",
    category,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(source);
  const normalizedContent = content.replace(/\r\n/g, "\n");

  return (
    <main className="bg-yellow-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">

        <h1 className="text-4xl font-bold mb-4">
          {data.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8">
          Published: {String(data.publishedAt)} • Author: {data.author}
        </div>

        <article className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {content}
  </ReactMarkdown>
        </article>

      </div>
    </main>
  );
}