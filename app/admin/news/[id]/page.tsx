import Link from "next/link";
import { notFound } from "next/navigation";
import { handleGetNewsById } from "@/lib/actions/news.action";

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-950 text-emerald-400 border border-emerald-800",
  draft:     "bg-zinc-800 text-zinc-400 border border-zinc-700",
  archived:  "bg-amber-950 text-amber-400 border border-amber-800",
};

const CATEGORY_STYLES: Record<string, string> = {
  politics:      "bg-red-950 text-red-400",
  sports:        "bg-blue-950 text-blue-400",
  technology:    "bg-violet-950 text-violet-400",
  entertainment: "bg-pink-950 text-pink-400",
  business:      "bg-cyan-950 text-cyan-400",
  health:        "bg-green-950 text-green-400",
  world:         "bg-orange-950 text-orange-400",
};

export default async function ViewNewsPage({ params }: { params: { id: string } }) {
  const result = await handleGetNewsById(params.id);

  if (!result.success || !result.data) notFound();

  const news = result.data;

  const formatDate = (d?: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit", month: "long", year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <Link href="/admin/news" className="hover:text-zinc-300 transition-colors">News</Link>
          <span>/</span>
          <span className="text-zinc-300 truncate max-w-xs">{news.title}</span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link href="/admin/news"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 hover:text-zinc-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <Link href={`/admin/news/${params.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Article
          </Link>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[news.status]}`}>
            {news.status}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLES[news.category] || "bg-zinc-800 text-zinc-400"}`}>
            {news.category}
          </span>
          {news.isFeatured && (
            <span className="px-2 py-1 rounded-md text-xs font-semibold bg-yellow-950 text-yellow-400 border border-yellow-800">
              ★ Featured
            </span>
          )}
          <span className="text-xs text-zinc-500 ml-auto">{news.views?.toLocaleString()} views</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white leading-tight">{news.title}</h1>

        {/* Author & Date */}
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
            {news.author?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{news.author?.name || "Admin"}</p>
            <p className="text-xs text-zinc-500">
              {news.publishedAt
                ? `Published ${formatDate(news.publishedAt)}`
                : `Created ${formatDate(news.createdAt)}`
              }
            </p>
          </div>
        </div>

        {/* Thumbnail */}
        {news.thumbnail && (
          <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800">
            <img
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${news.thumbnail}`}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Summary */}
        <div className="p-4 bg-zinc-900 border-l-2 border-zinc-600 rounded-r-lg">
          <p className="text-zinc-300 text-base leading-relaxed italic">{news.summary}</p>
        </div>

        {/* Content */}
        <div
          className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/* Tags */}
        {news.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-800">
            {news.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Slug */}
        <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
          <p className="text-xs text-zinc-500 mb-1">Slug</p>
          <p className="text-sm text-zinc-400 font-mono">{news.slug}</p>
        </div>
      </div>
    </div>
  );
}
