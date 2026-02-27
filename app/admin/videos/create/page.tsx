import Link from "next/link";
import VideoForm from "../_components/VideoForm";

export default function CreateVideoPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <Link href="/admin/videos" className="hover:text-zinc-300 transition-colors">Videos</Link>
          <span>/</span>
          <span className="text-zinc-300">Create</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">New Video</h1>
            <p className="text-zinc-500 text-sm mt-1">Upload and publish a video</p>
          </div>
          <Link href="/admin/videos"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 text-sm hover:border-zinc-600 hover:text-zinc-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>
      </div>
      <VideoForm mode="create" />
    </div>
  );
}
