import Link from "next/link";
import Image from "next/image";

interface News {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  thumbnail?: string;
  category: string;
  publishedAt: string;
  createdAt: string;
}

interface NewsGridProps {
  title: string;
  news: News[];
  viewAllHref?: string;
}

export default function NewsGrid({ title, news, viewAllHref }: NewsGridProps) {
  if (!news || news.length === 0) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            See All →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item) => (
          <Link
            key={item._id}
            href={`/news/${item.slug}`}
            className="group flex flex-col"
          >
            {/* Image */}
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
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              {/* Category badge */}
              <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded uppercase">
                {item.category}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-gray-500">
              {formatDate(item.publishedAt || item.createdAt)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
