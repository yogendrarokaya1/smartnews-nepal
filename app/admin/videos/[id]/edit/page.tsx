import Link from "next/link";
import { notFound } from "next/navigation";
import { handleGetVideoById } from "@/lib/actions/video.action";
import VideoForm from "../../_components/VideoForm";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await handleGetVideoById(id);

  if (!result.success || !result.data) notFound();

  const video = result.data;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <Link href="/admin/videos" className="hover:text-zinc-300 transition-colors">Videos</Link>
          <span>/</span>
          <Link href={`/admin/videos/${id}`} className="hover:text-zinc-300 transition-colors truncate max-w-xs">
            {video.title}
          </Link>
          <span>/</span>
          <span className="text-zinc-300">Edit</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Edit Video</h1>
            <p className="text-zinc-500 text-sm mt-1 truncate max-w-md">{video.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/admin/videos/${id}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 hover:text-zinc-200 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </Link>
            <Link href="/admin/videos"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 hover:text-zinc-200 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          </div>
        </div>
      </div>

      <VideoForm mode="edit" initialData={video} />
    </div>
  );
}
