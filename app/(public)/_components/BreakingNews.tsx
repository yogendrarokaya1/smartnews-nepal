"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface BreakingNewsItem {
  _id: string;
  title: string;
  slug: string;
}

export default function BreakingNews() {
  const [newsItems, setNewsItems] = useState<BreakingNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        // Fetch latest 5 featured or most recent news
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news?limit=5&sortBy=publishedAt&sortOrder=desc`
        );
        const data = await response.json();
        
        if (data.success) {
          setNewsItems(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch breaking news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
    // Refresh every 5 minutes
    const interval = setInterval(fetchBreakingNews, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading || newsItems.length === 0) return null;

  return (
    <div className="flex items-center gap-3 flex-1 ml-8 overflow-hidden">
      {/* Breaking News Badge */}
      <div className="flex-shrink-0 flex items-center gap-2 bg-red-600 px-3 py-1 rounded">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="text-white text-xs font-bold uppercase tracking-wider">
          Breaking
        </span>
      </div>

      {/* Scrolling News Ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent z-10" />
        
        <div className="animate-scroll whitespace-nowrap">
          {/* Duplicate items for seamless loop */}
          {[...newsItems, ...newsItems].map((item, index) => (
            <Link
              key={`${item._id}-${index}`}
              href={`/news/${item.slug}`}
              className="inline-block text-white text-sm hover:text-yellow-300 transition-colors mx-8"
            >
              <span className="font-medium">•</span> {item.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Custom scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}