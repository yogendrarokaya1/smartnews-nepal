"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["all","national","politics","sports","technology","entertainment","business","health","world"];

const STATUS_STYLES: Record<string, string> = {
  published: "bg-emerald-950 text-emerald-400 border border-emerald-800",
  draft:     "bg-zinc-800 text-zinc-400 border border-zinc-700",
  archived:  "bg-amber-950 text-amber-400 border border-amber-800",
};

const CATEGORY_STYLES: Record<string, string> = {
  national:     "bg-zinc-950 text-zinc-400",
  politics:      "bg-red-950 text-red-400",
  sports:        "bg-blue-950 text-blue-400",
  technology:    "bg-violet-950 text-violet-400",
  entertainment: "bg-pink-950 text-pink-400",
  business:      "bg-cyan-950 text-cyan-400",
  health:        "bg-green-950 text-green-400",
  world:         "bg-orange-950 text-orange-400",
};

interface News {
  _id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  isFeatured: boolean;
  views: number;
  publishedAt?: string;
  createdAt: string;
  author?: { name: string };
}

interface NewsTableProps {
  news: News[];
  total: number;
  page: number;
  totalPages: number;
  category: string;
  status: string;
  search: string;
  loading: boolean;
  onCategoryChange: (c: string) => void;
  onStatusChange:   (s: string) => void;
  onSearchChange:   (s: string) => void;
  onPageChange:     (p: number) => void;
  onDelete:         (id: string, title: string) => void;
  onToggleFeatured: (id: string) => void;
  onPublish:        (id: string) => void;
  onArchive:        (id: string) => void;
}

export default function NewsTable({
  news, total, page, totalPages,
  category, status, search, loading,
  onCategoryChange, onStatusChange, onSearchChange, onPageChange,
  onDelete, onToggleFeatured, onPublish, onArchive,
}: NewsTableProps) {

  const formatDate = (d?: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  return (
    <div className="space-y-4">

      {/* ── Filters ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <Link
            href="/admin/news/create"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Article
          </Link>
        </div>
      </div>

      {/* ── Category Tabs ── */}
      <div className="flex gap-1 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              category === cat
                ? "bg-white text-black"
                : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="text-xs text-zinc-500">
        {loading ? "Loading..." : `${total} article${total !== 1 ? "s" : ""} found`}
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Featured</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Views</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="bg-zinc-950">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-4">
                        <div className="h-4 bg-zinc-800 rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-zinc-600">
                      <svg className="w-10 h-10 text-zinc-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-sm">No articles found</span>
                    </div>
                  </td>
                </tr>
              ) : (
                news.map(item => (
                  <tr key={item._id} className="bg-zinc-950 hover:bg-zinc-900/40 transition-colors group">

                    {/* Title */}
                    <td className="px-4 py-3 max-w-xs">
                      <div className="flex flex-col">
                        <span className="text-zinc-200 font-medium truncate group-hover:text-white transition-colors">
                          {item.title}
                        </span>
                        {item.author && (
                          <span className="text-xs text-zinc-600 mt-0.5">{item.author.name}</span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${CATEGORY_STYLES[item.category] || "bg-zinc-800 text-zinc-400"}`}>
                        {item.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${STATUS_STYLES[item.status] || "bg-zinc-800 text-zinc-400"}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onToggleFeatured(item._id)}
                        className={`text-lg transition-transform hover:scale-110 ${item.isFeatured ? "opacity-100" : "opacity-25 hover:opacity-60"}`}
                        title="Toggle featured"
                      >
                        ★
                      </button>
                    </td>

                    {/* Views */}
                    <td className="px-4 py-3 text-zinc-400 tabular-nums">
                      {item.views.toLocaleString()}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-zinc-500 text-xs whitespace-nowrap">
                      {formatDate(item.publishedAt || item.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}
                        <Link href={`/admin/news/${item._id}`}
                          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all" title="View">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        {/* Edit */}
                        <Link href={`/admin/news/${item._id}/edit`}
                          className="p-1.5 rounded-md text-zinc-500 hover:text-blue-400 hover:bg-blue-950 transition-all" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        {/* Publish */}
                        {item.status === "draft" && (
                          <button onClick={() => onPublish(item._id)}
                            className="p-1.5 rounded-md text-zinc-500 hover:text-emerald-400 hover:bg-emerald-950 transition-all" title="Publish">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        {/* Archive */}
                        {item.status === "published" && (
                          <button onClick={() => onArchive(item._id)}
                            className="p-1.5 rounded-md text-zinc-500 hover:text-amber-400 hover:bg-amber-950 transition-all" title="Archive">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          </button>
                        )}
                        {/* Delete */}
                        <button onClick={() => onDelete(item._id, item.title)}
                          className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-950 transition-all" title="Delete">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900/40">
            <span className="text-xs text-zinc-500">Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => onPageChange(page - 1)} disabled={page === 1}
                className="px-3 py-1.5 rounded-md text-xs text-zinc-400 border border-zinc-800 hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                ← Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = page <= 3 ? i + 1 : page - 2 + i;
                if (p < 1 || p > totalPages) return null;
                return (
                  <button key={p} onClick={() => onPageChange(p)}
                    className={`px-3 py-1.5 rounded-md text-xs border transition-colors ${
                      p === page ? "bg-white text-black border-white" : "text-zinc-400 border-zinc-800 hover:border-zinc-600"
                    }`}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
                className="px-3 py-1.5 rounded-md text-xs text-zinc-400 border border-zinc-800 hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}