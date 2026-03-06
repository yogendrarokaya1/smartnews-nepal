import Link from "next/link";
import Image from "next/image";

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

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // Extract YouTube thumbnail from video URL
  const getYouTubeThumbnail = (url: string) => {
    try {
      let videoId = null;
      
      if (url.includes("youtube.com")) {
        const urlObj = new URL(url);
        videoId = urlObj.searchParams.get("v");
      } else if (url.includes("youtu.be")) {
        videoId = url.split("/").pop()?.split("?")[0];
      }
      
      if (videoId) {
        // Use maxresdefault for highest quality, fallback to hqdefault
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } catch (e) {
      // Invalid URL
    }
    return null;
  };

  // Determine thumbnail source
  const thumbnailUrl = getYouTubeThumbnail(video.videoUrl) || 
    (video.thumbnail ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${video.thumbnail}` : null);

  return (
    <Link href={`/videos/${video.slug}`} className="group flex flex-col">
      {/* Thumbnail with play icon overlay */}
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 mb-3">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
            <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-xs text-white font-semibold">
            {formatDuration(video.duration)}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {video.title}
      </h3>

      {/* Meta */}
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{formatViews(video.views)} views</span>
        <span>•</span>
        <span className="capitalize">{video.category}</span>
      </div>
    </Link>
  );
}