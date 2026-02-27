import { notFound } from "next/navigation";
import { handleGetVideoBySlug, handleGetPublishedVideos } from "@/lib/actions/public-video.action";
import Link from "next/link";
import VideoCard from "../../_components/VideoCard";

export default async function VideoWatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await handleGetVideoBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const video = result.data;

  // Fetch related videos from same category
  const relatedResult = await handleGetPublishedVideos({
    category: video.category,
    limit: 8,
  });
  const relatedVideos = relatedResult.success
    ? relatedResult.data.filter((v: any) => v.slug !== video.slug)
    : [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Extract video ID for embedding
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("youtube.com")
        ? new URL(url).searchParams.get("v")
        : url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url; // Direct video URL
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span>/</span>
          <Link href="/videos" className="hover:text-blue-600 dark:hover:text-blue-400">
            Videos
          </Link>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300 capitalize">
            {video.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Video Player (2/3 width) ── */}
          <div className="lg:col-span-2">

            {/* Video Player */}
            <div className="aspect-video rounded-xl overflow-hidden bg-black mb-4">
              {video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be") || video.videoUrl.includes("vimeo.com") ? (
                <iframe
                  src={getEmbedUrl(video.videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-full"
                  poster={video.thumbnail ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${video.thumbnail}` : undefined}
                />
              )}
            </div>

            {/* Video Info */}
            <div className="space-y-4">

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {video.title}
              </h1>

              {/* Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{formatViews(video.views)} views</span>
                  <span>•</span>
                  <span>{formatDate(video.publishedAt || video.createdAt)}</span>
                </div>
                <span className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full text-xs font-semibold uppercase">
                  {video.category}
                </span>
              </div>

              {/* Author */}
              {video.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300">
                    {video.author.fullName?.[0]?.toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {video.author.fullName || "Admin"}
                    </p>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {video.description}
                </p>
              </div>

              {/* Tags */}
              {video.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Related Videos Sidebar (1/3 width) ── */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Related Videos
            </h2>
            <div className="space-y-4">
              {relatedVideos.slice(0, 6).map((relatedVideo: any) => (
                <VideoCard key={relatedVideo._id} video={relatedVideo} />
              ))}
            </div>

            {relatedVideos.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No related videos found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
