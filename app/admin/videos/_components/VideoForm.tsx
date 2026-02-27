"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { handleCreateVideo, handleUpdateVideo } from "@/lib/actions/video.action";

const CATEGORIES = ["national", "politics", "sports", "technology", "entertainment", "business", "health", "world"];
const STATUSES   = ["draft","published","archived"];

interface VideoFormProps {
  initialData?: {
    _id?: string;
    title?: string;
    description?: string;
    videoUrl?: string;
    category?: string;
    tags?: string[];
    status?: string;
    thumbnail?: string;
    isFeatured?: boolean;
    duration?: number;
  };
  mode: "create" | "edit";
}

export default function VideoForm({ initialData = {}, mode }: VideoFormProps) {
  const router  = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title:       initialData.title       || "",
    description: initialData.description || "",
    videoUrl:    initialData.videoUrl    || "",
    category:    initialData.category    || "technology",
    tags:        initialData.tags?.join(", ") || "",
    status:      initialData.status      || "draft",
    isFeatured:  initialData.isFeatured  || false,
    duration:    initialData.duration    || 0,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview]     = useState<string>(
    initialData.thumbnail
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${initialData.thumbnail}`
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const fd = new FormData();
      fd.append("title",       form.title.trim());
      fd.append("description", form.description.trim());
      fd.append("videoUrl",    form.videoUrl.trim());
      fd.append("category",    form.category);
      fd.append("status",      form.status);
      fd.append("isFeatured",  String(form.isFeatured));
      fd.append("duration",    String(form.duration));

      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      tagsArray.forEach(tag => fd.append("tags[]", tag));

      if (thumbnail) fd.append("thumbnail", thumbnail);

      const result = mode === "create"
        ? await handleCreateVideo(fd)
        : await handleUpdateVideo(initialData._id!, fd);

      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => router.push("/admin/videos"), 1000);
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err: Error | any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Feedback */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-950 border border-red-800 text-red-400 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400 text-sm">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Main Content ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title" value={form.title} onChange={handleChange}
              required maxLength={200} placeholder="Enter video title..."
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <div className="text-right text-xs text-zinc-600">{form.title.length}/200</div>
          </div>

          {/* Video URL */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Video URL <span className="text-red-500">*</span>
            </label>
            <input
              name="videoUrl" value={form.videoUrl} onChange={handleChange}
              required type="url" placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 font-mono text-sm"
            />
            <p className="text-xs text-zinc-500">YouTube, Vimeo, or direct video URL</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description" value={form.description} onChange={handleChange}
              required maxLength={1000} rows={6} placeholder="Describe the video..."
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-y"
            />
            <div className="text-right text-xs text-zinc-600">{form.description.length}/1000</div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Tags
              <span className="ml-2 text-zinc-600 normal-case font-normal">(comma separated)</span>
            </label>
            <input
              name="tags" value={form.tags} onChange={handleChange}
              placeholder="sports, football, tutorial"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Duration (seconds)
            </label>
            <input
              name="duration" type="number" value={form.duration} onChange={handleChange}
              min="0" placeholder="300"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
            <p className="text-xs text-zinc-500">
              {form.duration > 0 && `${Math.floor(form.duration / 60)}:${(form.duration % 60).toString().padStart(2, '0')}`}
            </p>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">

          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Thumbnail
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="relative aspect-video rounded-lg border-2 border-dashed border-zinc-800 hover:border-zinc-600 cursor-pointer transition-colors overflow-hidden group"
            >
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Change image</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Click to upload thumbnail</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {thumbnail && <p className="text-xs text-zinc-500 truncate">{thumbnail.name}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category" value={form.category} onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-600 cursor-pointer capitalize"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat} className="capitalize">{cat}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {STATUSES.map(s => (
                <button key={s} type="button"
                  onClick={() => setForm(prev => ({ ...prev, status: s }))}
                  className={`py-2 rounded-lg text-xs font-semibold capitalize transition-all border ${
                    form.status === s
                      ? s === "published" ? "bg-emerald-950 text-emerald-400 border-emerald-700"
                        : s === "draft"   ? "bg-zinc-800 text-zinc-200 border-zinc-600"
                        : "bg-amber-950 text-amber-400 border-amber-700"
                      : "bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <div>
              <p className="text-sm font-medium text-zinc-200">Featured Video</p>
              <p className="text-xs text-zinc-500 mt-0.5">Show on landing page</p>
            </div>
            <button
              type="button"
              onClick={() => setForm(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.isFeatured ? "bg-white" : "bg-zinc-700"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-black rounded-full transition-transform ${form.isFeatured ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => router.back()}
              className="flex-1 py-3 rounded-lg border border-zinc-800 text-zinc-400 text-sm font-medium hover:border-zinc-600 hover:text-zinc-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : (
                mode === "create" ? "Create Video" : "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
