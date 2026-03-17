import { prisma } from "@/lib/prisma";
import NewsCard from "@/components/NewsCard";
import { Newspaper } from "lucide-react";

export const metadata = {
  title: "新闻资讯 - 华人通",
  description: "美国华人社区最新新闻资讯",
};

export default async function NewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">新闻资讯</h1>
          <p className="text-sm text-gray-500">了解美国华人社区最新动态</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            summary={item.summary}
            image={item.image}
            category={item.category}
            author={item.author}
            createdAt={item.createdAt.toISOString()}
          />
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-16">
          <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400">暂无新闻资讯</p>
        </div>
      )}
    </div>
  );
}
