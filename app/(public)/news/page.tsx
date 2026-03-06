"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { handleGetPublishedNews } from "@/lib/actions/public-news.action";
import Image from "next/image";
import Link from "next/link";

interface News {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail?: string;
  category: string;
  publishedAt: string;
  createdAt: string;
  views: number;
}

export default function CategoryNewsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "sports";

  const [news, setNews] = useState<News[]>([]);
  const [trending, setTrending] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      const categoryResult = await handleGetPublishedNews({
        category,
        page: 1,
        limit: 20,
      });

      const trendingResult = await handleGetPublishedNews({
        page: 1,
        limit: 9,
      });

      if (categoryResult.success) setNews(categoryResult.data);
      if (trendingResult.success) {
        const sorted = [...trendingResult.data].sort((a, b) => b.views - a.views);
        setTrending(sorted.slice(0, 9));
      }

      setLoading(false);
    };

    fetchNews();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading news...</p>
      </div>
    );
  }

  const [featured, ...restNews] = news;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          {category}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left: Main Content (2/3 width) ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Featured Article */}
            {featured && (
              <Link href={`/news/${featured.slug}`} className="block group">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200">
                    {featured.thumbnail ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${featured.thumbnail}`}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center bg-gray-300 w-full h-full">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {featured.title}
                    </h2>
                  </div>
                </div>
              </Link>
            )}

            {/* Ad Banner */}
            <div className="bg-green-500 rounded-lg p-6 text-center mb-6">
              <p className="text-white font-semibold">Advertisement Space</p>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {restNews.map((item) => (
                <Link key={item._id} href={`/news/${item.slug}`} className="group flex flex-col">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 mb-3">
                    {item.thumbnail ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail}`}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: Trending Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Trending</h2>
                <Link
                  href="/news"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  See More
                </Link>
              </div>
              <div className="space-y-4">
                {trending.map((item) => (
                  <Link key={item._id} href={`/news/${item.slug}`} className="block group">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="h-px bg-gray-200 mt-2" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
