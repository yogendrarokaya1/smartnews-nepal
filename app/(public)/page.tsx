import { handleGetLandingNews, handleGetCategoryPreviews } from "@/lib/actions/public-news.action";
import { handleGetLatestVideos } from "@/lib/actions/public-video.action";
import RecentNews from "./_components/RecentNews";
import NewsGrid from "./_components/NewsGrid";
import CategorySection from "./_components/CategorySection";
import VideoSection from "./_components/VideoSection";
import AdBanner from "./_components/Adbanner";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
export default async function HomePage() {
  // Fetch latest 5 landing news
  const landingResult = await handleGetLandingNews();
  const latestNews = landingResult.success ? landingResult.data.latest : [];

  // Fetch category previews (3 items per category)
  const categoriesResult = await handleGetCategoryPreviews(3);
  const categoryData = categoriesResult.success ? categoriesResult.data : {};

  // Fetch latest 8 videos
  const videosResult = await handleGetLatestVideos(8);
  const latestVideos = videosResult.success ? videosResult.data.latest : [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  TOP LEADERBOARD AD - Above the fold                           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="mb-8 flex justify-center">
          <AdBanner size="leaderboard" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  HERO SECTION - Recent News                                    */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <RecentNews news={latestNews} />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  MORE NEWS GRID                                                */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {latestNews.length > 5 && (
          <NewsGrid
            title="More News"
            news={latestNews.slice(5, 13)}
            viewAllHref="/news"
          />
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  MID-PAGE BANNER AD - After More News                          */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="my-12 flex justify-center">
          <AdBanner size="leaderboard" />
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  MAIN CONTENT WITH SIDEBAR LAYOUT                              */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ───────────────────────────────────────────────────────────── */}
          {/*  LEFT: Main Content (9 columns)                              */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-9 space-y-10">
            {/* POLITICS */}
            {categoryData.politics?.length > 0 && (
              <CategorySection title="Politics" category="politics" news={categoryData.politics} />
            )}

            {/* National */}
            {categoryData.national?.length > 0 && (
              <CategorySection title="National" category="national" news={categoryData.national} />
            )}
            
            {/* SPORTS */}
            {categoryData.sports?.length > 0 && (
              <CategorySection title="Sports" category="sports" news={categoryData.sports} />
            )}

            {/* INTERNATIONAL */}
            {categoryData.world?.length > 0 && (
              <CategorySection title="International" category="world" news={categoryData.world} />
            )}

            {/* IN-CONTENT AD - Between categories */}
            <div className="flex justify-center py-4">
              <AdBanner size="leaderboard" />
            </div>

            {/* BUSINESS */}
            {categoryData.business?.length > 0 && (
              <CategorySection title="Business" category="business" news={categoryData.business} />
            )}

            {/* TECHNOLOGY */}
            {categoryData.technology?.length > 0 && (
              <CategorySection title="Technologies" category="technology" news={categoryData.technology} />
            )}

            

            {/* ENTERTAINMENT */}
            {categoryData.entertainment?.length > 0 && (
              <CategorySection title="Entertainment" category="entertainment" news={categoryData.entertainment} />
            )}

            {/* HEALTH */}
            {categoryData.health?.length > 0 && (
              <CategorySection title="Health" category="health" news={categoryData.health} />
            )}

            

            {/* VIDEOS SECTION */}
            {latestVideos.length > 0 && (
              <div className="pt-4">
                <VideoSection
                  title="Latest Videos"
                  videos={latestVideos}
                  viewAllHref="/videos"
                />
              </div>
            )}
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/*  RIGHT: Sidebar (3 columns)                                  */}
          {/* ───────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-3 space-y-6">
            
            {/* SIDEBAR AD - Rectangle 1 */}
            {/* <div className="sticky top-20">
              <AdBanner size="rectangle" className="mx-auto" />
            </div> */}

            {/* TRENDING SECTION */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Trending Now
              </h3>
              <div className="space-y-3">
                {latestNews.slice(0, 5).map((item: { _id: Key | null | undefined; slug: unknown; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: number) => (
                  <a
                    key={item._id}
                    href={`/news/${item.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-bold text-gray-300">
                        {index + 1}
                      </span>
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* SIDEBAR AD - Rectangle 2 */}
            <AdBanner size="rectangle" className="mx-auto" />

            {/* SOCIAL MEDIA SECTION */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="text-lg font-bold mb-4 text-gray-900">
                Follow Us
              </h3>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                    f
                  </div>
                  <span className="text-sm font-medium text-gray-900">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm">
                    𝕏
                  </div>
                  <span className="text-sm font-medium text-gray-900">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm">
                    ▶
                  </div>
                  <span className="text-sm font-medium text-gray-900">YouTube</span>
                </a>
              </div>
            </div>

            {/* SIDEBAR AD - Rectangle 3 */}
            <AdBanner size="rectangle" className="mx-auto" />

          </aside>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/*  BOTTOM LEADERBOARD AD - Before footer                         */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="mt-12 flex justify-center">
          <AdBanner size="leaderboard" />
        </div>

      </div>
    </div>
  );
}