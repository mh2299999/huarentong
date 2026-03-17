import Link from "next/link";
import { prisma } from "@/lib/prisma";
import NewsCard from "@/components/NewsCard";
import PostCard from "@/components/PostCard";
import { CATEGORY_MAP, PostCategory } from "@/types";
import {
  ArrowRight,
  Newspaper,
  Home,
  ShoppingCart,
  Briefcase,
  FileText,
  MessageCircle,
  Users,
  Shield,
  Zap,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  REAL_ESTATE: <Home className="w-6 h-6" />,
  SECOND_HAND: <ShoppingCart className="w-6 h-6" />,
  JOBS: <Briefcase className="w-6 h-6" />,
  IMMIGRATION: <FileText className="w-6 h-6" />,
  SOCIAL: <MessageCircle className="w-6 h-6" />,
};

export default async function HomePage() {
  const [latestNews, latestPosts] = await Promise.all([
    prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.post.findMany({
      where: { isActive: true },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              华人通
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-2">
              HuaRenTong — 美国华人生活服务平台
            </p>
            <p className="text-red-200 mb-8 max-w-2xl mx-auto">
              连接华人社区，提供新闻资讯、房产信息、二手交易、招聘求职、移民资讯等一站式服务
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/posts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
              >
                浏览分类信息
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/posts/create"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                免费发布信息
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {(Object.entries(CATEGORY_MAP) as [PostCategory, { label: string; emoji: string }][]).map(
            ([key, { label }]) => (
              <Link
                key={key}
                href={`/posts?category=${key}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow group"
              >
                <div className="text-red-500 group-hover:text-red-600 transition-colors flex justify-center mb-2">
                  {categoryIcons[key]}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                  {label}
                </span>
              </Link>
            )
          )}
        </div>
      </section>

      {/* Latest News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-red-600" />
            最新资讯
          </h2>
          <Link
            href="/news"
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            查看更多
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestNews.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              summary={news.summary}
              image={news.image}
              category={news.category}
              author={news.author}
              createdAt={news.createdAt.toISOString()}
            />
          ))}
        </div>
        {latestNews.length === 0 && (
          <p className="text-center text-gray-400 py-8">暂无新闻资讯</p>
        )}
      </section>

      {/* Latest Posts */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">📋 最新发布</h2>
            <Link
              href="/posts"
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              查看更多
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestPosts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                category={post.category}
                price={post.price}
                location={post.location}
                createdAt={post.createdAt.toISOString()}
                user={post.user}
              />
            ))}
          </div>
          {latestPosts.length === 0 && (
            <p className="text-center text-gray-400 py-8">暂无分类信息</p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
          为什么选择华人通？
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">华人社区</h3>
            <p className="text-sm text-gray-500">
              专为美国华人打造，中文界面，贴近社区需求
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">安全可靠</h3>
            <p className="text-sm text-gray-500">
              实名认证，信息审核，保障交易安全
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">简单高效</h3>
            <p className="text-sm text-gray-500">
              一键发布，快速浏览，高效连接供需双方
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
