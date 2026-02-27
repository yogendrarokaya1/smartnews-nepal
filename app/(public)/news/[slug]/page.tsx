import { notFound } from "next/navigation";
import { handleGetNewsBySlug, handleGetPublishedNews } from "@/lib/actions/public-news.action";
import Image from "next/image";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default async function ArticlePage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  // If params is a promise, await it
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const result = await handleGetNewsBySlug(slug);

  if (!result.success || !result.data) notFound();
  const article = result.data;

  // Fetch trending news from SAME CATEGORY for sidebar
  const trendingResult = await handleGetPublishedNews({ 
    category: article.category, 
    page: 1, 
    limit: 20 
  });
  const trending = trendingResult.success
    ? trendingResult.data
        .filter((item: { slug: string }) => item.slug !== article.slug) // Exclude current article
        .sort((a: { views: number }, b: { views: number }) => b.views - a.views)
        .slice(0, 9)
    : [];

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { 
    month: "long", 
    day: "2-digit", 
    year: "numeric" 
  });

  // Convert plain text to HTML paragraphs
  const formatContent = (content: string) => {
    // Split by double newlines (paragraph breaks)
    const paragraphs = content.split(/\n\n+/);
    
    return paragraphs
      .map(para => {
        // Convert single newlines within paragraphs to <br>
        const formatted = para.trim().replace(/\n/g, '<br />');
        return formatted ? `<p class="mb-4 text-justify leading-relaxed">${formatted}</p>` : '';
      })
      .join('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Left: Main Article (2/3 width) ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-blue-600">News</Link>
            <span>/</span>
            <span className="capitalize">{article.category}</span>
          </div>

          {/* Category Badge */}
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold text-white bg-red-600 rounded uppercase tracking-wider">
            {article.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
                {article.author?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {article.author?.fullName || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(article.publishedAt || article.createdAt)}
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {article.views?.toLocaleString() || 0} views
            </div>
          </div>

          {/* Thumbnail */}
          {article.thumbnail && (
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-200 mb-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${article.thumbnail}`}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Summary */}
          <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg mb-6">
            <p className="text-gray-800 italic leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Content with proper paragraph formatting */}
          <div
            className="prose prose-lg max-w-none
              text-gray-800
              prose-headings:text-gray-900
              prose-p:text-gray-800
              prose-p:mb-4
              prose-a:text-blue-600
              prose-strong:text-gray-900
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />

    
          {/* {article.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-300">
              <span className="text-sm font-medium text-gray-700">Tags:</span>
              {article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )} */}

          
        </div>

        {/* ── Right: Trending Sidebar (1/3 width) ── */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 sticky top-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Trending in {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </h2>
              <Link 
                href={`/news?category=${article.category}`} 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                See More
              </Link>
            </div>
            
            {trending.length > 0 ? (
              <div className="space-y-4">
                {trending.map((item: { 
                  _id: Key | null | undefined; 
                  slug: any; 
                  title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; 
                }) => (
                  <Link key={item._id} href={`/news/${item.slug}`} className="block group">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-snug uppercase transition-colors">
                      {item.title}
                    </h3>
                    <div className="h-px bg-gray-200 mt-3" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No trending articles in this category</p>
            )}

            {/* Ad Space */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center border border-gray-200" style={{ height: "250px" }}>
                <div className="text-center text-gray-400">
                  <div className="text-xs font-semibold mb-1">Advertisement</div>
                  <div className="text-xs opacity-60">300x250</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}