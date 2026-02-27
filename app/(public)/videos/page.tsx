"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { handleGetPublishedVideos } from "@/lib/actions/public-video.action";
import VideoCard from "../_components/VideoCard";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "politics", label: "Politics" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
  { value: "world", label: "World" },
];

interface Video {
  _id: string;
  title: string;
  slug: string;
  thumbnail?: string;
  videoUrl: string;
  category: string;
  views: number;
  duration?: number;
  publishedAt: string;
  createdAt: string;
}

export default function VideosPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);

  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const params: any = { page, limit: 12 };
      if (category !== "all") params.category = category;

      const result = await handleGetPublishedVideos(params);
      if (result.success) {
        setVideos(result.data);
        setPagination(result.pagination);
      }
      setLoading(false);
    };
    fetchVideos();
  }, [category, page]);

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams();
    if (newCategory !== "all") params.set("category", newCategory);
    params.set("page", "1");
    window.location.href = `/videos?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    params.set("page", String(newPage));
    window.location.href = `/videos?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Videos
        </h1>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                category === cat.value
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {!loading && videos.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page} of {pagination.totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">
              No videos found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
