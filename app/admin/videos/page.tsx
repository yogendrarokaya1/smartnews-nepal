"use client";

import { useState, useEffect, useCallback } from "react";
import VideoTable from "./_components/VideoTable";
import {
  handleGetAllVideos,
  handleDeleteVideo,
  handleToggleFeatured,
  handlePublishVideo,
  handleArchiveVideo,
} from "@/lib/actions/video.action";

interface Video {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  isFeatured: boolean;
  views: number;
  duration?: number;
  publishedAt?: string;
  createdAt: string;
  author?: { fullName: string };
}

export default function AdminVideosPage() {
  const [videos, setVideos]         = useState<Video[]>([]);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory]     = useState("all");
  const [status, setStatus]         = useState("all");
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(true);
  const [toast, setToast]           = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting]     = useState(false);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const params: any = { page, limit: 10, sortBy: "createdAt", sortOrder: "desc" };
      if (category !== "all") params.category = category;
      if (status   !== "all") params.status   = status;
      if (search.trim())      params.search   = search.trim();

      const result = await handleGetAllVideos(params);
      if (result.success) {
        setVideos(result.data);
        setTotal(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
      } else {
        showToast(result.message || "Failed to load videos", "error");
      }
    } catch {
      showToast("Failed to load videos", "error");
    } finally {
      setLoading(false);
    }
  }, [page, category, status, search]);

  useEffect(() => { fetchVideos(); }, [fetchVideos]);
  useEffect(() => { setPage(1); }, [category, status, search]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const result = await handleDeleteVideo(deleteTarget.id);
    if (result.success) {
      showToast("Video deleted");
      fetchVideos();
    } else {
      showToast(result.message || "Delete failed", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleToggle = async (id: string) => {
    const result = await handleToggleFeatured(id);
    if (result.success) { showToast(result.message); fetchVideos(); }
    else showToast(result.message || "Failed", "error");
  };

  const handlePublish = async (id: string) => {
    const result = await handlePublishVideo(id);
    if (result.success) { showToast("Video published"); fetchVideos(); }
    else showToast(result.message || "Failed", "error");
  };

  const handleArchive = async (id: string) => {
    const result = await handleArchiveVideo(id);
    if (result.success) { showToast("Video archived"); fetchVideos(); }
    else showToast(result.message || "Failed", "error");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl text-sm font-medium ${
          toast.type === "success"
            ? "bg-emerald-950 border border-emerald-800 text-emerald-300"
            : "bg-red-950 border border-red-800 text-red-300"
        }`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-950 border border-red-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-100">Delete Video</h3>
                <p className="text-xs text-zinc-500">This cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              Delete <span className="text-zinc-200 font-medium">"{deleteTarget.title}"</span>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-600 transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-500 disabled:opacity-50 transition-colors">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <span>Admin</span><span>/</span>
          <span className="text-zinc-300">Videos</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Video Management</h1>
            <p className="text-zinc-500 text-sm mt-1">Manage all videos across categories</p>
          </div>
          <div className="hidden sm:block px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-center">
            <p className="text-lg font-bold text-white tabular-nums">{total}</p>
            <p className="text-xs text-zinc-500">Total</p>
          </div>
        </div>
      </div>

      <VideoTable
        videos={videos}
        total={total}
        page={page}
        totalPages={totalPages}
        category={category}
        status={status}
        search={search}
        loading={loading}
        onCategoryChange={cat => { setCategory(cat); setPage(1); }}
        onStatusChange={s => { setStatus(s); setPage(1); }}
        onSearchChange={setSearch}
        onPageChange={setPage}
        onDelete={(id, title) => setDeleteTarget({ id, title })}
        onToggleFeatured={handleToggle}
        onPublish={handlePublish}
        onArchive={handleArchive}
      />
    </div>
  );
}
