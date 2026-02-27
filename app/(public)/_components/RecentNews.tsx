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

interface RecentNewsProps {
  news: News[];
}

export default function RecentNews({ news }: RecentNewsProps) {
  if (!news || news.length === 0) return null;

  const [featured, ...sideNews] = news;

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
        <h2 className="text-2xl font-bold text-gray-900">
          Recent News
        </h2>
        <Link
          href="/news"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          See All →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured News - Large */}
        <Link
          href={`/news/${featured.slug}`}
          className="lg:col-span-2 group relative overflow-hidden rounded-lg bg-gray-200 aspect-[16/10]"
        >
          {featured.thumbnail && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${featured.thumbnail}`}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-red-600 rounded uppercase tracking-wider">
              {featured.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {featured.title}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDate(featured.publishedAt || featured.createdAt)}
            </p>
          </div>
        </Link>

        {/* Side News - 4 items */}
        <div className="space-y-4">
          {sideNews.slice(0, 4).map((item) => (
            <Link
              key={item._id}
              href={`/news/${item.slug}`}
              className="flex gap-3 group"
            >
              {item.thumbnail && (
                <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnail}`}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="inline-block px-2 py-0.5 mb-1 text-xs font-semibold text-white bg-red-600 rounded uppercase">
                  {item.category}
                </span>
                <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatDate(item.publishedAt || item.createdAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
